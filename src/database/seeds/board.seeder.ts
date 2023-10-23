import { Board, } from 'src/entity/board.entity';
import { DataSource, } from 'typeorm';
import { Seeder, SeederFactoryManager, } from 'typeorm-extension';

export default class BoardSeeder implements Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
    // const repository = dataSource.getRepository(User);

    // await repository.insert([
    //   {
    //     username: 'user',
    //     name: 'canoasin',
    //     password: '12341234',
    //   },
    // ]);

    const BoardsFactory = factoryManager.get(Board);
    await BoardsFactory.saveMany(10);
  }
}
