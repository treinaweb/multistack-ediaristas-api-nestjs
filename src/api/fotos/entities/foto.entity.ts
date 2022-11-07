import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('foto')
export class Foto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, unique: true })
  fileName: string;

  @Column({ nullable: false })
  contentLength: number;

  @Column({ nullable: false })
  url: string;
}
