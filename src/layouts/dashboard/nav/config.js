// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Projects',
    path: '/dashboard/projects',
    icon: icon('ic_projects'),
  },
  {
    title: 'Staff Management',
    path: '/dashboard/staff',
    icon: icon('ic_staffs'),
  },
  {
    title: 'Account Management',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },

];

export default navConfig;
