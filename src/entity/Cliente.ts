import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrdemServico } from "./OrdemServico";

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


@Entity('cliente')
export class Cliente {
    @PrimaryGeneratedColumn()
    cliente_id!: number;
    
    @Column()
    nome!: string;

    @Column()
    razaosocial!: string;
    
    @Column({ unique: true })
    email!: string;
    
    @Column()
    telefone!: string;
    
    @Column()
    endereco!: string;
    
    @Column()
    cidade!: string;
    
    @Column({
        type: 'enum',
        enum: ESTADOS,
        default: ESTADOS.PR
    })
    estado!: ESTADOS;
    
    @Column({ nullable: true })
    cep?: string;

    // Relacionamento com OrdemServico
    @OneToMany(() => OrdemServico, ordem => ordem.cliente)
    ordens!: OrdemServico[];

}