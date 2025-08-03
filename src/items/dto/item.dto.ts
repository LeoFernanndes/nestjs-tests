import { ApiProperty } from "@nestjs/swagger";
import { CreateItemDto } from './create-item.dto';


export class ItemDto extends CreateItemDto {
    @ApiProperty()
    id: number
}

export class ListItemDto {
    @ApiProperty()
    items: ItemDto[]
    @ApiProperty()
    pages: number
}