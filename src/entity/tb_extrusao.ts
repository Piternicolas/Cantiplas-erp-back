import { Entity, PrimaryColumn, Column,JoinColumn, BeforeInsert, OneToOne } from "typeorm";
import { OrdemServicoPedido } from "./tb_ordemservico_pedido";

export enum TipoTratamento {
    SIM = 'sim',
    SIMPLES = 'simples',
    DUPLO = 'duplo'
}

@Entity('tb_extrusao')
export class Extrusao {

    @PrimaryColumn()
    extrusao_id!: number;

    @OneToOne(() => OrdemServicoPedido)
    @JoinColumn({ name: 'pedido_id' })
    pedido!: OrdemServicoPedido;

    @Column({type: 'varchar', length: 255, nullable: true})
    descricao_ext!: string;

    @Column({type: 'decimal', precision: 5, scale: 1, default: 0})
    kg_extrusado!: number;

    @Column({type: 'decimal', precision: 5, scale: 1, default: 0, nullable: true})
    apara_ext!: number;

    @Column({type: 'decimal', precision: 2, default: 0})
    calibrador!: number;

    @Column({type: 'varchar', length: 50, nullable: true, default: 'nao'})
    pigmento!: string

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    metragem!: number;

    @Column({type: 'enum', enum: TipoTratamento})
    tratamento!: TipoTratamento;

    @Column({type: 'decimal', precision: 4, scale: 2, default: 0})
    aba!: number;

    @Column({ type: 'timestamp', nullable: true })
    data_fim_ext!: Date;
}