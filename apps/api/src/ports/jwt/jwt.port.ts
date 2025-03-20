type Unit =
  | 'Years'
  | 'Year'
  | 'Yrs'
  | 'Yr'
  | 'Y'
  | 'Weeks'
  | 'Week'
  | 'W'
  | 'Days'
  | 'Day'
  | 'D'
  | 'Hours'
  | 'Hour'
  | 'Hrs'
  | 'Hr'
  | 'H'
  | 'Minutes'
  | 'Minute'
  | 'Mins'
  | 'Min'
  | 'M'
  | 'Seconds'
  | 'Second'
  | 'Secs'
  | 'Sec'
  | 's'
  | 'Milliseconds'
  | 'Millisecond'
  | 'Msecs'
  | 'Msec'
  | 'Ms'

type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>

type StringValue = `${number}` | `${number}${UnitAnyCase}` | `${number} ${UnitAnyCase}`

export type JWTGenerateOptions = {
  expiresIn?: StringValue
}

export type IJWTAdapter = {
  generate(value: object, secret: string, options?: JWTGenerateOptions): Promise<string>
  decode<T>(value: string, secret: string): Promise<T>
}

export type IJWT = {
  generate(value: object, secret: string, options?: JWTGenerateOptions): Promise<string>
  decode<T>(value: string, secret: string): Promise<T>
}
