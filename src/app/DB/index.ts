import config from '../config';
import { User } from '../modules/user/user.model';

const superUser = {
  name: 'Admin',
  email: 'admin@gmail.com',
  password: config.super_admin_password,
  phone: '01322901105',
  role: 'admin',
  address: 'Level-4, 34, Awal Centre, Banani, Dhaka',
};

const seedAdmin = async () => {
  const isSuperAdminExits = await User.findOne({ role: 'admin' });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedAdmin;
