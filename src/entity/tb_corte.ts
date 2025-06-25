import { Entity, PrimaryGeneratedColumn, Column,JoinColumn, BeforeInsert, OneToOne } from "typeorm";
import { OrdemServicoPedido } from "./tb_ordemservico_pedido";

@Entity('tb_corte')
export class Corte {
    @PrimaryGeneratedColumn()
    corte_id!: number;

    @OneToOne(() => OrdemServicoPedido)
    @JoinColumn({ name: 'pedido_id'})
    pedido!: OrdemServicoPedido;

    @Column({ type: 'varchar', length: 255, nullable: true })
    descricao_corte!: string;

    @Column({type: 'decimal', precision: 5, scale: 1, default: 0})
    kg_cortado!: number;

    @Column({type: 'decimal', precision: 5, scale: 1, default: 0})
    apara_corte!: number;

    @Column({type: 'decimal', precision: 6, scale: 2, default: 0})
    milheiro_final!: number;

    @Column({type: 'decimal', precision: 3, default: 0})
    volumes!: number;
}