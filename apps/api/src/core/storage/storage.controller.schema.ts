import { createRequestSchema, RequestInput } from '@starter/nestjs-server-hoisting'
import { z } from '@starter/schema'

export enum FileContextEnum {
  USER_AVATAR = 'USER_AVATAR',
  WORKSPACE_LOGO = 'WORKSPACE_LOGO',
  ORGANIZATION_LOGO = 'ORGANIZATION_LOGO',
}

export const FileContextEnumSchema = z.nativeEnum(FileContextEnum)

export const GetPresignedUrlSchema = createRequestSchema({
  body: z.object({
    fileName: z.string().meta({ example: 'avatar.png' }),
    context: FileContextEnumSchema,
  }),
  output: z.object({
    fileName: z.string().meta({ example: 'https://static.example.com.br/users/avatars/avatar.png' }),
    fileNameSigned: z.string().meta({
      example:
        'https://example-assets.s3.us-east-1.amazonaws.com/users/avatars/avatar.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAQ3EGRA3QFOIO6BNJ%2F20240722%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240722T044420Z&X-Amz-Expires=120&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIQCDYyadkEPDro%2F%2BNvTENYqEvrJznGS5VaFE9IoC4%2B53qwIgb89kWAUKKz%2FmZdYEsZSh%2BpeAMoqT%2BJu2X%2BRkCldZZxkq8AIIbhAAGgwwNTgyNjQxOTI3MzYiDNUuCGubYY9jRwzOCCrNAt01IuchHDd%2FKj3%2BqRRKHtaDj0Q7TD%2BmXP8ErwkVQGpJ0Jxo4ploxqRzeu6gNo7tvI%2Bse2EdJFbvy5iEfuPAJGHYdg1vszapTDH8OcCnL675MyUFC3VTaKZOk2miSINh6n0KG5lXhtijnfD0%2FN%2FLD2LB8Vkfv%2BEucKjgjessATmGpeOiplCPq8I4ziS5RtMVt6rLViBP%2FtMwD3cvsMLxVxR73JV8a8V1Vpi8cumkWR4TbQMFer7YDXqyYlkx%2FFV75i42aeE%2B%2FgyUbm45%2BXg2Nw1kkOInLFUN%2BchKKeAEfTmbIhfwTG0ABu5PFTpRdHGCzDi2FDg9Zv%2Bm%2FjHz%2BYA4XaH1fmIZaoro6hJidTBtD44Oe8uu1Si8fhNpl3yxUYACYmq7V0EFNZn7f7DuXNAnQax%2B01%2B9uNyFEv8IzFb5VXxwRv68HU7x1RCq9YujsDCMx%2Fe0BjqeAWBs7smAXBeRlmVmDMmTrIqlcj8pCnHBzrcrxXpbvhbRnrBY%2FuMidsCOVreh%2FrBN0mlKr59FlOIva3%2FCAkq%2BE7SM%2F%2FAYjSeflrQNjtpXZKgGCLtwnOjMeC58KvsaY%2FMsDbpcnxEvLr%2FS%2F1%2FMcCz2VYaP1R79ebABmizuGRmPl3mYJul%2FKmcqfv2%2FyVYzoRoUzJosrH1l7ZXUXd3KtcPj&X-Amz-Signature=abf32e0904b323aade82f6e69f0561ef2ca61a4cb064086530634cf6b0151b73&X-Amz-SignedHeaders=host&x-amz-acl=public-read&x-id=PutObject',
    }),
  }),
})
export type GetPresignedUrlRequest = RequestInput<typeof GetPresignedUrlSchema>
