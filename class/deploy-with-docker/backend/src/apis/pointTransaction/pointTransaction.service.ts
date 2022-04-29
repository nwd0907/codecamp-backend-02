import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  PointTransaction,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointTransaction.entity';

@Injectable()
export class PointTransactionService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointTransactionRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly connection: Connection,
  ) {}

  async create({ impUid, amount, currentUser }) {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.connect();

    // transaction 시작!!
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      // 1. pointTransaction 테이블에 거래기록 1줄 생성
      const pointTransaction = this.pointTransactionRepository.create({
        impUid: impUid,
        amount: amount,
        user: currentUser,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      await queryRunner.manager.save(pointTransaction); // await this.pointTransactionRepository.save(pointTransaction);

      // throw new Error('에러발생!!!');

      // 2. 유저의 돈 찾아오기
      // const user = await this.userRepository.findOne({ id: currentUser.id });
      const user = await queryRunner.manager.findOne(
        User,
        { id: currentUser.id },
        { lock: { mode: 'pessimistic_write' } },
      );

      // 3. 유저의 돈 업데이트
      // await this.userRepository.update(
      //   { id: user.id },
      //   { point: user.point + amount },
      // );
      const updatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser); // this.userRepository.save(updatedUser)

      // commit 성공 확정!!!
      await queryRunner.commitTransaction();

      // 4. 최종결과 프론트엔드에 돌려주기
      return pointTransaction;
    } catch (error) {
      // rollback 되돌리기 !!
      await queryRunner.rollbackTransaction();
    } finally {
      // 연결 해제!!
      await queryRunner.release();
    }
  }
}
