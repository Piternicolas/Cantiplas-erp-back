import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { OrdemServicoPedido } from './tb_ordemservico_pedido';
export enum ESTADOS {
  AC = 'AC',
  AL = 'AL',
  AP = 'AP',
  AM = 'AM',
  BA = 'BA',
  CE = 'CE',
  DF = 'DF',
  ES = 'ES',
  GO = 'GO',
  MA = 'MA',
  MT = 'MT',
  MS = 'MS',
  MG = 'MG',
  PA = 'PA',
  PB = 'PB',
  PR = 'PR',
  PE = 'PE',
  PI = 'PI',
  RJ = 'RJ',
  RN = 'RN',
  RS = 'RS',
  RO = 'RO',
  RR = 'RR',
  SC = 'SC',
  SP = 'SP',
  SE = 'SE',
  TO = 'TO',
}

@Entity('tb_representantes')
export class Representantes {
    @PrimaryGeneratedColumn()
    representante_id!: number;

    @Column({ type:'varchar', length: 255})
        nome!: string;
    
        @Column({ type:'varchar', length: 255})
        razaosocial!: string;
    
        @Column({ type: 'enum', enum: ['PF', 'PJ']})
        tipo_pessoa!: 'PF' | 'PJ';
    
        @Column({ type:'varchar', length: 14})
        cnpj!: string;
    
        @Column({ type: 'varchar', length: 11, nullable: true })
        cpf!: string
    
        @Column({ type: 'varchar', length: 20, nullable: true })
        inscricao_estadual!: string;
    
        @Column({ type: 'varchar', length: 20, nullable: true })
        inscricao_municipal!: string;
    
        @Column({type: 'varchar', length: 15, nullable: true})
        telefone!: string;
    
        @Column({type: 'varchar', length: 15})
        celular!: string;
    
        @Column({type: 'varchar', length: 100})
        email!: string;
    
        @Column({type: 'varchar', length: 255, nullable: true})
        site!: string;
    
        @Column({type: 'varchar', length: 20})
        cep!: string;
    
        @Column({type: 'varchar', length: 255})
        endereco!: string;
    
        @Column({type: 'varchar', length: 100})
        cidade!: string;
    
        @Column({ type: 'enum', enum: ESTADOS, default: ESTADOS.PR })
        estado!: ESTADOS;
    
        @CreateDateColumn({ type: 'timestamp' })
        data_cadastro!: Date;
    
        @OneToMany(() => OrdemServicoPedido, os => os.cliente)
        ordens!: OrdemServicoPedido[];
}