import { PoultryGenderEnum } from '@cig-platform/enums'
import { IPoultry } from '@cig-platform/types'
import useBreeder from 'hooks/useBreeder'
import { useCallback, useEffect, useMemo, useState } from 'react'
import ReactFamilyTree from 'react-family-tree'
import { useParams } from 'react-router-dom'
import ContentSearchService from 'services/ContentSearchService'
import type { ExtNode } from 'relatives-tree/lib/types'
import { BsGenderMale, BsGenderFemale } from 'react-icons/bs'

import { TreeCrest, TreeDewlap, TreeGender, TreeInfo, TreeItem, TreeName, TreeTail, Container, TreeItemContainer, TreeItemExpand, TreeItemAddMom, TreeItemAddDad } from './ManagreTree.styles'
import { useAppDispatch } from 'contexts/AppContext/AppContext'
import { setIsLoading } from 'contexts/AppContext/appActions'
import BackofficeBffService from 'services/BackofficeBffService'
import useAuth from 'hooks/useAuth'

const WIDTH = 150
const HEIGHT = 150

type NodeFamiliar = {
  id: string;
  type: string;
}

type Node = {
  id: string;
  gender: any;
  parents: NodeFamiliar[];
  children: NodeFamiliar[];
  siblings: NodeFamiliar[];
  spouses: NodeFamiliar[];
}

function getNodeStyle({ left, top }: Readonly<ExtNode>) {
  return {
    width: WIDTH,
    height: HEIGHT,
    transform: `translate(${left * (WIDTH / 2)}px, ${top * (HEIGHT / 2)}px)`,
  }
}

const ManageTreePage = () => {
  const { poultryId } = useParams<{ poultryId: string }>()

  const breeder = useBreeder()

  const dispatch = useAppDispatch()

  const { token } = useAuth()

  const [poultries, setPoultries] = useState<IPoultry[]>([])

  useEffect(() => {
    if (!poultryId || !breeder?.id) return

    (async () => {
      dispatch(setIsLoading(true))

      try {
        const poultryData = await ContentSearchService.getPoultry(breeder.id, poultryId)
        const poultry = poultryData?.poultry
        const parents = []

        if (poultry?.mom) {
          parents.push(poultry.mom)
        }

        if (poultry?.dad) {
          parents.push(poultry.dad)
        }

        setPoultries([
          poultry,
          ...parents
        ])
      } catch (error) {
        console.log(error)
      } finally {
        dispatch(setIsLoading(false))
      }
    })()
  }, [poultryId, breeder?.id])
  
  const nodes = useMemo<Node[]>(() => poultries.map((poultry) => {
    const parents = []

    if (poultry.momId && poultries.some(p => p.id === poultry.momId)) {
      parents.push({
        id: poultry.momId,
        type: 'blood'
      })
    }

    if (poultry.dadId && poultries.some(p => p.id === poultry.dadId)) {
      parents.push({
        id: poultry.dadId,
        type: 'blood'
      })
    }

    const children = poultries.filter(p => p.momId === poultry.id || p.dadId === poultry.id).map(p => ({
      id:p.id,
      type: 'blood'
    }))

    const siblings = poultries.filter(p => ((p.momId === poultry.momId && p.momId) || (p.dadId === poultry.dadId && p.dadId)) && p.id !== poultry.id)

    const spouses = children.map(c => {
      const p = poultries.find(p => p.id === c.id)
      const spouseId = p?.momId === poultry.id ? p?.dadId : p?.momId
      
      if (!spouseId) return undefined

      const spouse = poultries.find(p => p.id === spouseId)

      if (!spouse) return undefined

      return { type: 'married', id: spouse.id }
    }).filter(Boolean) as NodeFamiliar[]

    return {
      id: poultry.id,
      gender: poultry.gender === PoultryGenderEnum.Male ? 'male' : 'female',
      parents,
      spouses,
      children,
      siblings
    }
  }), [poultries])

  const handleClickExpandButton = useCallback(async (poultryId: string) => {
    dispatch(setIsLoading(true))

    try {
      const poultryData = await ContentSearchService.getPoultry(breeder?.id, poultryId)
      const poultry = poultryData?.poultry
      const parents: IPoultry[] = []

      if (poultry?.mom) {
        parents.push(poultry.mom)
      }

      if (poultry?.dad) {
        parents.push(poultry.dad)
      }

      setPoultries(prevPoultries => [
        ...prevPoultries,
        ...parents
      ])
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }, [breeder?.id, dispatch])

  const handleAddParent = useCallback(async ({ dadId, momId }: { dadId?: string; momId?: string }, poultryId: string) => {
    if (!breeder) return

    try {
      dispatch(setIsLoading(true))

      await BackofficeBffService.updatePoultry(breeder.id, poultryId, token, { dadId, momId })

      setPoultries(prevPoultries => prevPoultries.map(p => p.id === poultryId ? ({
        ...p,
        ...(dadId ? { dadId } : {}),
        ...(momId ? { momId } : {})
      }) : ({ ...p })))

      handleClickExpandButton(poultryId)
    } catch (error) {
      console.log(error)
    } finally {
      dispatch(setIsLoading(false))
    }
  }, [handleClickExpandButton, dispatch, breeder?.id, token])

  const handleAddDad = useCallback((poultryId: string) => {
    const dadId = window.prompt('Qual o id do pai?') ?? ''

    if (!dadId) return

    handleAddParent({ dadId }, poultryId)
  }, [handleAddParent])

  const handleAddMom = useCallback((poultryId: string) => {
    const momId = window.prompt('Qual o id do mãe?') ?? ''

    if (!momId) return

    handleAddParent({ momId }, poultryId)
  }, [handleAddParent])

  if (!poultries.length) return null

  return (
    <Container>
      <ReactFamilyTree
        nodes={nodes as any}
        rootId={poultryId ?? ''}
        width={WIDTH}
        height={HEIGHT}
        renderNode={(node) => {
          const poultry = poultries.find(p => p.id === node.id)

          if (!poultry) return null

          const shouldRenderExpandButton = Boolean(poultry.dadId || poultry.momId) && poultries.every(p => poultry.dadId ? p.id !== poultry.dadId : p.id !== poultry.momId)
          const shouldRenderAddDadButton = !poultry.dadId
          const shouldRenderAddMomButton = !poultry.momId

          return (
            <TreeItemContainer key={node.id} style={getNodeStyle(node)}>
              <TreeItem>
                {shouldRenderAddDadButton && (
                  <TreeItemAddDad onClick={() => handleAddDad(poultry.id)}>
                    + <BsGenderMale />
                  </TreeItemAddDad>
                )}

                {shouldRenderAddMomButton && (
                  <TreeItemAddMom onClick={() => handleAddMom(poultry.id)}>
                    + <BsGenderFemale />
                  </TreeItemAddMom>
                )}

                {shouldRenderExpandButton && (
                  <TreeItemExpand onClick={() => alert(poultry.id)}>+</TreeItemExpand>
                )}

                {shouldRenderExpandButton && (
                  <TreeItemExpand onClick={() => handleClickExpandButton(poultry.id)}>+</TreeItemExpand>
                )}

                <TreeName>{poultry?.name}</TreeName>
                <TreeGender>{poultry?.gender}</TreeGender>

                {Boolean(poultry?.dewlap || poultry?.crest || poultry?.tail) && (
                  <TreeInfo>
                    <TreeDewlap>{poultry?.dewlap}</TreeDewlap>
                    <TreeCrest>{poultry?.crest}</TreeCrest>
                    <TreeTail>{poultry?.tail}</TreeTail>
                  </TreeInfo>
                )}
              </TreeItem>
            </TreeItemContainer>
          )
        }}
      />
    </Container>
  )
}

export default ManageTreePage
