import React from "react";
import { CreateDevice, AdminDevices, PageTitle, CreateBrand, AdminBrands, CreateType, AdminTypes, AdminUsers, AddRole, CreateRole, Orders } from "../../components/admin";

const tabsTitles = [
"Create device", "Devices", "Orders", "Create Brand", "Brands", "Create Type", "Types", "Create role", "Add role", "Users"
]


interface AdminProps {}

const Admin: React.FC<AdminProps> = ({}) => {
	const [ activePage, setActivePage ] = React.useState(0);
	
	const openPage = (e: any) => {
		setActivePage(+e.target.dataset.index);
	}

  return (
    <div className="admin">
      <div className="container">
        <div className="wrapper">
          <h3 className="admin__title title">Admin</h3>
					<div className="admin__pages">
						<ul className="admin__pages-titles">
							{
								tabsTitles.map((title, index) => <PageTitle key={index} index={index} activePage={activePage} openPage={openPage} title={title} /> )
							}
						</ul>
						<div className="admin__pages-content">
							<CreateDevice index={0} activePage={activePage} />
							<AdminDevices index={1} activePage={activePage} />
							<Orders index={2} activePage={activePage} />
							<CreateBrand index={3} activePage={activePage} />
							<AdminBrands index={4} activePage={activePage} />
							<CreateType index={5} activePage={activePage} />
							<AdminTypes index={6} activePage={activePage} />
							<CreateRole index={7} activePage={activePage} />
							<AddRole index={8} activePage={activePage} />
							<AdminUsers index={9} activePage={activePage} />
						</div>
					</div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
