import { Board, } from 'src/entity/board.entity';
import { setSeederFactory, } from 'typeorm-extension';

export default setSeederFactory(Board, (faker) => {
  const board = new Board();
  board.userId = 1;
  board.contents = faker.lorem.words();

  return board;
});
