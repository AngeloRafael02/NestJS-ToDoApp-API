import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Threats {
    @ApiProperty({
        description: 'Unique identifier of the Threats',
        example: '1',
        readOnly: true,
    })
    @PrimaryGeneratedColumn()
    id:number

    @ApiProperty({
        description: 'Name of the Threat Level',
        example: 'High',
        type:'string',
        maxLength: 10,
        nullable: false,
        uniqueItems: true
    })
    @Column({ type:'varchar', length:10, nullable:false, unique:true })
    level:string
}