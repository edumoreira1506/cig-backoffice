import { PoultryGenderEnum } from '@cig-platform/enums'
import { IPoultry } from '@cig-platform/types'
import useBreeder from 'hooks/useBreeder'
import { useEffect, useMemo, useState } from 'react'
import ReactFamilyTree from 'react-family-tree'
import { useParams } from 'react-router-dom'
import ContentSearchService from 'services/ContentSearchService'
import type { ExtNode } from 'relatives-tree/lib/types'

import { TreeCrest, TreeDewlap, TreeGender, TreeInfo, TreeItem, TreeName, TreeTail, Container, TreeItemContainer } from './ManagreTree.styles'

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

  const [poultries, setPoultries] = useState<IPoultry[]>([])

  useEffect(() => {
    if (!poultryId || !breeder?.id) return

    (async () => {
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
      }
    })()
  }, [poultryId, breeder?.id])
  
  const nodes = useMemo<Node[]>(() => poultries.map((poultry) => {
    const parents = []

    if (poultry.mom) {
      parents.push({
        id: poultry.mom.id,
        type: 'blood'
      })
    }

    if (poultry.dad) {
      parents.push({
        id: poultry.dad.id,
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

          return (
            <TreeItemContainer key={node.id} style={getNodeStyle(node)}>
              <TreeItem>
                <TreeName>{poultry?.name}</TreeName>
                <TreeGender>{poultry?.gender}</TreeGender>
                <TreeInfo>
                  <TreeDewlap>{poultry?.dewlap}</TreeDewlap>
                  <TreeCrest>{poultry?.crest}</TreeCrest>
                  <TreeTail>{poultry?.tail}</TreeTail>
                </TreeInfo>
              </TreeItem>
            </TreeItemContainer>
          )
        }}
      />
    </Container>
  )
}

export default ManageTreePage
