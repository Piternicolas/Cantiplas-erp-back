import { 
  Entity, PrimaryGeneratedColumn, Column, 
  ManyToOne, JoinColumn } from 'typeorm';
import { Cliente } from './Cliente';

export enum SituacaoOS {
  PENDENTE = 'pendente',
  EXTRUSAO = 'extrusao',
  IMPRESSAO = 'impressao',
  CORTE = 'corte'
}

export enum SimNao {
  SIM = 'sim',
  NAO = 'nao'
}

@Entity('ordem_servico')
export class OrdemServico {
  @PrimaryGeneratedColumn()
  OS_id!: number;

  // Relacionamento com Cliente
  @ManyToOne(() => Cliente, cliente => cliente.ordens)
  @JoinColumn({ name: 'cliente_id' })
  cliente!: Cliente;

  @Column({ type: 'date' })
  data_pedido!: string;

  @Column()
  criado_por!: string;

  @Column()
  representante!: string;

  @Column({
    type: 'enum',
    enum: SituacaoOS,
    default: SituacaoOS.PENDENTE
  })
  situacao!: SituacaoOS;

  @Column()
  qnt_pedido!: number;

  @Column({
    type: 'enum',
    enum: SimNao,
    default: SimNao.NAO
  })
  colorido!: SimNao;

  @Column({
    type: 'enum',
    enum: SimNao,
  })
  estampado!: SimNao;

}
