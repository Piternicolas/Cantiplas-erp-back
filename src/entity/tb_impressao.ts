import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, BeforeInsert, OneToOne } from "typeorm";
import { OrdemServicoPedido } from "./tb_ordemservico_pedido";

export enum TipoCyrel {
    NOVO = 'novo',
    VELHO = 'velho'
}

@Entity('tb_impressao')
export class Impressao {
    @PrimaryGeneratedColumn()
    impressao_id!: number;

    @OneToOne(() => OrdemServicoPedido)
    @JoinColumn({ name: 'pedido_id'})
    pedido!: OrdemServicoPedido;

    @Column({type: 'varchar', length: 255, nullable: true})
    descricao_imp!: string;

    @Column({type: 'decimal', precision: 5, scale: 1, default: 0})
    kg_impresso!: number;

    @Column({type: 'decimal', precision: 5, scale: 1, default: 0})
    apara_imp!: number;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    metragem!: number;

    @Column({type: 'decimal', precision: 2, default: 0})
    cilindro!: number;

    @Column({type: 'decimal', precision: 4, default: 0})
    pasta_cliche!: number;

    @Column({ type: 'enum', enum: TipoCyrel })
    cyrel!: TipoCyrel;

    @Column({ type: 'timestamp', nullable: true })
    data_fim_imp!: Date;
}