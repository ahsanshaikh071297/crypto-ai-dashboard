import { NavLink } from 'react-router-dom';
import { sidebarMenu } from '../../data/SidebarMenu';

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">CryptoAI</div>

      <nav className="sidebar-nav">
        {sidebarMenu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'sidebar-link active' : 'sidebar-link'
              }
            >
              <Icon className="sidebar-icon" />
              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;