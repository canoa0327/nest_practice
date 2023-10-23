import { User, } from 'src/entity/user.entity';
import { setSeederFactory, } from 'typeorm-extension';

export default setSeederFactory(User, (faker) => {
  const user = new User();
  user.username = faker.person.fullName();
  user.password = faker.lorem.words();

  return user;
});
