export enum Routes {
  Home = '/',
  EditBreeder = '/criatorio',
  EditPassword = '/editar-senha',
  EditProfile = '/editar-perfil',
  NewPoultry = '/nova-ave',
  EditPoultry = '/ave/:poultryId/editar',
  ManagePoultryTree = '/ave/:poultryId/arvore-genealogica',
  ViewPoultry = '/ave/:poultryId/visualizar',
  NewRegister = '/ave/:poultryId/novo-registro',
  Logout = '/logout',
  Sales = '/vendas',
  Purchases = '/compras',
  Purchase = '/compras/:dealId',
  Sale = '/vendas/:dealId',
  ReviewPurchase = '/compras/:dealId/avaliar'
}
