import { 
    Entity, 
    Column, 
    PrimaryGeneratedColumn, 
    ViewEntity,
    PrimaryColumn,
    ViewColumn,
    DataSource,
    ManyToOne,
    JoinColumn,
    Check
} from "typeorm";
import { Categories } from "./categories";
import { Conditions } from "./conditions";
import { User } from "./users";
import { Threats } from "./threats";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Check('prio >= 0 OR prio IS NULL')
export class Task{
    @ApiProperty({
        description: 'Unique identifier of the Task',
        example: '1',
        readOnly: true,
    })
    @PrimaryGeneratedColumn({ name:'id', type:'bigint' })
    id!:number

    @ApiProperty({
        description: 'Name of the Task',
        example: 'Finish this Project',
        type:'string',
        nullable: false,
        uniqueItems:true
    })
    @Column({ type:'varchar',length:50, nullable:false, unique:true })
    title:string

    @ApiProperty({
        description: 'Description of Task',
        example: 'This is a Description',
        type:'string',
        maxLength: 255,
        nullable: true
    })
    @Column({ type:'varchar', length:255, nullable:true })
    note?:string

    @ApiProperty({
        description: 'Join Column Categories Table',
        type:()=>Categories
    })
    @ManyToOne(() => Categories, (category) => category.cat) 
    @JoinColumn({name:'cat_id'})
    category:Categories;

    @ApiProperty({
        description: 'Key ID to Categories Table',
        type:'number',
        nullable: false,
        default: 1,
        example: 1
    })
    @Column({ type: 'int', nullable:false, default:1 })
    cat_id:number;

    @ApiProperty({
        description: 'Key ID to Categories Table',
        type:'number',
        nullable: true,
        example: 1
    })
    @Column({ type:'int', nullable: true })
    prio?:number

    @ApiProperty({
        description: 'Join Column to Threat Levels Table',
        type:()=>Threats
    })
    @ManyToOne(()=> Threats, (threats) => threats.level)
    @JoinColumn({name:'threat_id'})
    threat:Threats;
    
    @ApiProperty({
        description: 'Key ID to Threat Levels Table',
        type:'number',
        nullable: true,
        default: 1,
        example: 1
    })
    @Column({ type:'int', default:1, nullable:true })
    threat_id?:number;

    @ApiProperty({
        description: 'Join Column to Conditions Table',
        type:()=>Conditions
    })
    @ManyToOne(() => Conditions, (conditions) => conditions.stat) // Define foreign key relationship
    @JoinColumn({name:'stat_id'})
    status:Conditions

    @ApiProperty({
        description: 'Key ID to Conditions Table',
        type:'number',
        nullable: true,
        default: 1,
        example: 1
    })
    @Column({ type: 'int', default: 1, nullable:true })
    stat_id?:number;

    @ApiProperty({
        description:'Date the Task was Created',
        type:'string',
        nullable: false,
        example:'2011-01-01 00:00:00'
    })
    @Column({ type: 'timestamp without time zone',default: () => "CURRENT_TIMESTAMP", nullable:true })
    created_at?:Date

    @ApiProperty({
        description:'Date the Task was last Edited',
        type:'string',
        nullable: false,
        example:'2011-01-01 00:00:00'
    })
    @Column({ type: 'timestamp without time zone',default: () => "CURRENT_TIMESTAMP", nullable:true })
    last_edited?:Date

    @ApiProperty({
        description:"Date the Task's Deadline'",
        type:'string',
        nullable: false,
        example:'2011-01-01 00:00:00'
    })
    @Column({ type:'timestamp without time zone', nullable:true })
    deadline?:Date

    @ApiProperty({
        description: 'Join Column to Users Table',
        type:()=>User
    })
    @ManyToOne(() => User, (user) => user.id) // Define foreign key relationship
    @JoinColumn({name:'owner_id'})
    user:User

    @ApiProperty({
        description: 'Key ID to Users Table',
        type:'number',
        nullable: true,
        default: 1,
        example: 1
    })
    @Column({ type: 'int', nullable: false }) // Keep the owner_id in database
    owner_id: number;
};

@ViewEntity({
    expression: (dataSource:DataSource) => dataSource
    .createQueryBuilder()
    .select("t.id","ID")
    .addSelect("t.title", "Title")
    .addSelect("t.note", "Description")
    .addSelect("cat.cat","Category")
    .addSelect("t.prio","Priority")
    .addSelect("con.stat","Status")
    .addSelect("th.level","Threat Level")
    .addSelect("t.deadline", "Deadline")
    .addSelect("t.created_at", "Created At")
    .addSelect("t.last_edited", "Last Edited")
    .addSelect("t.stat_id","SID")
    .addSelect("t.cat_id", "CID")
    .addSelect("u.id","UID")
    .addSelect("th.id", "TID")
    .from(Task, "t")
    .innerJoin(Categories, "cat", "t.cat_id = cat.id")
    .innerJoin(Conditions, "con", "t.stat_id = con.id")
    .innerJoin(User, "u", "t.owner_id = u.id")
    .innerJoin(Threats,"th","t.threat_id = th.id")
})
export class taskView {
    @ApiProperty({
        description: 'Unique identifier of the Task',
        example: '1',
        readOnly: true,
    })
    @PrimaryColumn({name:'ID'})
    ID:number

    @ApiProperty({
        description: 'Name of the Task',
        example: 'Finish this Project',
        type:'string',
        nullable: false,
        uniqueItems:true
    })
    @ViewColumn({name:'Title'})
    Title:string

    @ApiProperty({
        description: 'Description of Task',
        example: 'This is a Description',
        type:'string',
        maxLength: 255,
        nullable: true
    })
    @ViewColumn({name:'Description'})
    Description:string

    @ApiProperty({
        description:"Date's Category'",
        type:'string',
        nullable: false,
        example:'Health, Career, Finance, etc.'
    })
    @ViewColumn({name:'Category'})
    Category:string

    @ApiProperty({
        description: 'Taks Priority, the higher the number the higher the priority',
        type:'number',
        nullable: true,
        example: 1
    })
    @ViewColumn({name:'Priority'})
    Priority:number

    @ApiProperty({
        description:"Date's Threat level'",
        type:'string',
        nullable: false,
        example:'low, medium, high, very high, inevitable'
    })
    @ViewColumn({name:"Threat Level"})
    "Threat Level":string

    @ApiProperty({
        description:"Date's Status'",
        type:'string',
        nullable: false,
        example:'Unfinished, In Progress, Finished'
    })
    @ViewColumn({name:'Status'})
    Status:string

    @ApiProperty({
        description:"Date the Task's Deadline'",
        type:'string',
        nullable: false,
        example:'2011-01-01 00:00:00'
    })
    @ViewColumn({name:'Deadline'})
    Deadline:Date

    @ApiProperty({
        description:'Date the Task was Created',
        type:'string',
        nullable: false,
        example:'2011-01-01 00:00:00'
    })
    @ViewColumn({name:'Created At'})
    "Created At":Date

    @ApiProperty({
        description:'Date the Task was last Edited',
        type:'string',
        nullable: false,
        example:'2011-01-01 00:00:00'
    })
    @ViewColumn({name:'Last Edited'})
    "Last Edited":Date

    @ApiProperty({
        description: 'Key ID to Conditions Table',
        type:'number',
        nullable: true,
        default: 1,
        example: 1
    })
    @ViewColumn({name:'SID'})
    SID:number

    @ApiProperty({
        description: 'Key ID to Categories Table',
        type:'number',
        nullable: true,
        default: 1,
        example: 1
    })
    @ViewColumn({name:'CID'})
    CID:number

    @ApiProperty({
        description: 'Key ID to Users Table',
        type:'number',
        nullable: true,
        default: 1,
        example: 1
    })
    @ViewColumn({name:'UID'})
    UID:number

    @ApiProperty({
        description: 'Key ID to Threats Table',
        type:'number',
        nullable: true,
        default: 1,
        example: 1
    })
    @ViewColumn({name:'TID'})
    TID:number
}
