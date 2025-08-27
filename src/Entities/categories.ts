import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Categories {

    @ApiProperty({
        description: 'Unique identifier of the Category',
        example: '1',
        readOnly: true,
    })
    @PrimaryGeneratedColumn()
    id:number

    @ApiProperty({
        description: 'Name of the category',
        example: 'Fitness',
        type:'string',
        maxLength: 20,
        nullable: false,
        uniqueItems: true
    })
    @Column({ type: 'varchar', length: 20, nullable: false, unique:true })
    cat:string
}