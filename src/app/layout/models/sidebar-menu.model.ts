export interface SidebarMenu {
  id: string;
  name: string;
  icon: string;
  path: string;
  selected: boolean;
  subMenus?: SidebarMenu[];
}
