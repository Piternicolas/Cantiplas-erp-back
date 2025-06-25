import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert, CreateDateColumn, OneToOne } from 'typeorm';
import { Clientes } from './tb_clientes';
import { AppDataSource } from '../config/data-source';
import { Representantes } from './tb_representantes';
import { Extrusao } from './tb_extrusao';
import { Impressao } from './tb_impressao';
import { Corte } from './tb_corte';

export enum SimNao {
    SIM = 'sim',
    NAO = 'nao'
}

export enum TipoMaterial {
    CANELA = 'canela',
    COEX = 'coex',
    COLORIDO = 'colorido',
    CRISTAL = 'cristal',
    PEAD = 'pead',
    PEBD = 'pebd',
    PP = 'pp',
}

export enum TipoCorte {
    LATERAL = 'lateral',
    FUNDO = 'fundo',
    SACOLA = 'sacola'
}

@Entity('tb_ordemservico_pedido')
export class OrdemServicoPedido {
    @PrimaryGeneratedColumn()
    pedido_id!: number;

    @ManyToOne(() => Clientes)
    @JoinColumn({ name: 'cliente_id' })
    cliente!: Clientes;

    @ManyToOne(() => Representantes)
    @JoinColumn({ name: 'representante_id' })
    representante!: Representantes;

    @OneToOne(() => Extrusao, extrusao => extrusao.pedido,
    {cascade: true, eager: true})
    extrusao!: Extrusao;

    @OneToOne(() => Impressao, imp => imp.pedido,
    {cascade: true, eager: true})
    impressao!: Impressao;
    
    @OneToOne(() => Corte, corte => corte.pedido,
    {cascade: true, eager: true})

    @Column({ type: 'varchar', length: 20, unique: true })
    numero_os!: string;

    @BeforeInsert()
    async gerarNumeroOS() {
        const anoAtual = new Date().getFullYear();
        const ultimo = await AppDataSource.getRepository(OrdemServicoPedido)
            .createQueryBuilder('os')
            .where('EXTRACT(YEAR FROM os.data_abertura) = :ano', { ano: anoAtual })
            .orderBy('os.pedido_id', 'DESC')
            .getOne();

        const proxNum = (ultimo?.pedido_id || 0) + 1;
        this.numero_os = `${anoAtual}-${proxNum.toString().padStart(5, '0')}`;
    } 

    @CreateDateColumn({ type: 'timestamp' })
    data_abertura!: Date;

    @Column({ type: 'timestamp', nullable: true })
    data_entrega!: Date;

    @Column({type: 'enum', enum: TipoMaterial})
    material!: string;

    @Column({ type: 'decimal', precision: 10, scale: 2})
    milheiro!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2})
    valor_milheiro!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    kg_pedido!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    largura!: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    altura!: number;

    @Column({ type: 'decimal', precision: 10, scale: 4 })
    micra!: number;

    @Column({ type: 'enum', enum: SimNao, default: SimNao.NAO })
    estampado!: SimNao;

    @Column({ type: 'enum', enum: SimNao, default: SimNao.NAO })
    colorido!: SimNao;

    @Column({ type: 'varchar', length: 50, default: 'N/A', nullable: true })
    pigmento!: string;

    @Column({ type: 'varchar', length: 255, default: 'N/A', nullable: true})
    descricao_pedido!: string;

    @Column({ type: 'timestamp', nullable: true })
    data_fechamento!: Date;

    // Corte ↓
    @Column({type: 'varchar', length: 10})
    sanfona_corte!: string;

    setSanfonaCorte(valor: number) {
        this.sanfona_corte = `${valor}cm`;
    }

    @Column({ type: 'enum', enum: TipoCorte, default: TipoCorte.LATERAL })
    tipo_corte!: TipoCorte;

    @Column({ type: 'decimal', precision: 5, scale: 1, default: 0 })
    Embalar_com!: number;

    @Column({ type: 'varchar', length: 50, default: 'N/A', nullable: true })
    tipo_furo!: string;

    @Column({ type: 'varchar', length: 50, default: 'N/A', nullable: true })
    tipo_alca!: string;

    @Column({ type: 'varchar', length: 50, default: 'N/A', nullable: true })
    tipo_fita!: string;
}