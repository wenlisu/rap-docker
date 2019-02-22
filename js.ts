export interface EnumDTO {
  /** 枚举ID */
  id?: number;
  /** 枚举描述 */
  desc?: string;
}

export interface Data {}

export interface ResultDTO {
  /** 状态码 */
  code?: number;
  /** 返回数据 */
  data?: Data;
  /** 信息 */
  msg?: string;
}

export interface AdvertisingDTO {
  /** id */
  id?: number;
  /** 图标 */
  iconUrl?: string;
  /** 排序值 */
  sortNo?: number;
  /** 广告状态 AdvertisingState */
  state?: number;
  /** 内容类型 AdContentType */
  contentType?: number;
  /** 内容 */
  content?: string;
  /** 图标ID */
  iconUrlID?: number;
  /** 位置 ADSiteType */
  siteType?: number;
  /** 1 Web 2 App端 */
  clientCategory?: number;
}

export interface BaccaratGameReportSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 结束时间 */
  gameCode?: string;
  /** 房间id */
  roomID?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface BaccaratMemberGameReportDTO {
  /** 庄卡：BaccaratCard */
  bankCards?: number;
  /** 闲卡：BaccaratCard */
  playCards?: number;
  /** 庄下注金额 */
  bankAmount?: number;
  /** 庄 +收益 -亏损 */
  bankProfit?: number;
  /** 闲下注金额 */
  playAmount?: number;
  /** 闲下注 +收益 -亏损 */
  playProfit?: number;
  /** 和下注金额 */
  tieAmount?: number;
  /** 和下注 +收益 -亏损 */
  tieProfit?: number;
  /** 庄对下注金额 */
  bankPairAmount?: number;
  /** 庄对下注 +收益 -亏损 */
  bankPairProfit?: number;
  /** 闲对下注金额 */
  playPairAmount?: number;
  /** 闲对下注 +收益 -亏损 */
  playPairProfit?: number;
  /** memberID */
  memberID?: number;
  /** 用户名字 */
  memberName?: string;
  /** 玩家类型 PlayerType */
  playerType?: number;
  /** 下注次数 */
  betTimes?: number;
  /** 总下注金额 */
  totalBetAmount?: number;
  /** 总盈利 + 赢利 -亏损 */
  totalProfit?: number;
  /** ip */
  ip?: string;
  /** 单号 */
  id?: number;
  /** 房间id */
  roomID?: number;
  /** 房间号 */
  roomNo?: number;
  /** 场号(value =第几场） */
  screeningNo?: number;
  /** 场编号 */
  screeningCode?: string;
  /** 游戏编号 */
  gameCode?: string;
  /** 游戏时间 */
  gameTime?: string;
  /** 游戏号（第几局） */
  gameNo?: number;
  /** 完成模式 1 正常，-1  正在结束中 其他的为异常 */
  finishMode?: number;
  /** 结果：赢了的赌注 1，百家乐BaccaratBet，2，龙虎IllustratingBet 3牛牛CattleBet */
  winBets?: number;
  /** 结果：赢方 1，百家乐BaccaratWinCamp，2，龙虎IllustratingWinCamp 3牛牛CattleWinCamp */
  winCamp?: number;
}

export interface BaccaratMemberGameReportSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface BaccaratNewestRoomReportSearchingDTO {
  /** 房间id */
  roomID?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface BaccaratReportSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface BaccaratRoomReportSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface IntListDTO {
  /** 列表 */
  list?: number;
}

export interface ListDTO {
  /** 列表 */
  list?: any[];
}

export interface MDBetableGameReportSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 结束时间 */
  gameCode?: string;
  /** 房间id */
  roomID?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface MemberGameReportSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface PageDTO {
  /** 数据条数 */
  size?: number;
  /** 页数 */
  page?: number;
  /** 总页数 */
  totalPage?: number;
  /** 总项目数 */
  totalSize?: number;
  /** 数据列表 */
  items?: any[];
}

export interface PagingDTO {
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface PlayerMemberGameReportSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface CattleGameReportSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 结束时间 */
  gameCode?: string;
  /** 房间id */
  roomID?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface CattleMemberGameReportDTO {
  /** 庄卡：CattleCard */
  bankCards?: number;
  /** 闲卡：CattleCard */
  playCards?: number;
  /** 庄下注金额 */
  bankAmount?: number;
  /** 庄 +收益 -亏损 */
  bankProfit?: number;
  /** 庄下注金额 */
  douBankAmount?: number;
  /** 庄 +收益 -亏损 */
  douBankProfit?: number;
  /** 闲下注金额 */
  playAmount?: number;
  /** 闲下注 +收益 -亏损 */
  playProfit?: number;
  /** 闲下注金额 */
  douPlayAmount?: number;
  /** 闲下注 +收益 -亏损 */
  douPlayProfit?: number;
  /** memberID */
  memberID?: number;
  /** 用户名字 */
  memberName?: string;
  /** 玩家类型 PlayerType */
  playerType?: number;
  /** 下注次数 */
  betTimes?: number;
  /** 总下注金额 */
  totalBetAmount?: number;
  /** 总盈利 + 赢利 -亏损 */
  totalProfit?: number;
  /** ip */
  ip?: string;
  /** 单号 */
  id?: number;
  /** 房间id */
  roomID?: number;
  /** 房间号 */
  roomNo?: number;
  /** 场号(value =第几场） */
  screeningNo?: number;
  /** 场编号 */
  screeningCode?: string;
  /** 游戏编号 */
  gameCode?: string;
  /** 游戏时间 */
  gameTime?: string;
  /** 游戏号（第几局） */
  gameNo?: number;
  /** 完成模式 1 正常，-1  正在结束中 其他的为异常 */
  finishMode?: number;
  /** 结果：赢了的赌注 1，百家乐BaccaratBet，2，龙虎IllustratingBet 3牛牛CattleBet */
  winBets?: number;
  /** 结果：赢方 1，百家乐BaccaratWinCamp，2，龙虎IllustratingWinCamp 3牛牛CattleWinCamp */
  winCamp?: number;
}

export interface CattleMemberGameReportSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface CattleReportSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface CattleRoomReportSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface PopularRecommendCreationDTO {
  /** 游戏类型 GameType */
  gameType?: number;
  /** 房间列表 */
  rooms?: number;
  /** 排序值 */
  popularSortNo?: number;
}

export interface Room {
  /** id */
  id?: number;
  /** 游戏类型 GameType */
  gameType?: number;
  /** 房间列表 */
  rooms?: number;
  /** 排序值 */
  popularSortNo?: number;
}

export interface PopularRecommendDTO {
  /** id */
  id?: number;
  /** 游戏类型 GameType */
  gameType?: number;
  /** 房间列表 */
  rooms?: Room[];
  /** 排序值 */
  popularSortNo?: number;
}

export interface RoomTinyDTO {
  /** id */
  id?: number;
  /** 游戏类型 GameType */
  gameType?: number;
  /** 房间列表 */
  rooms?: number;
  /** 排序值 */
  popularSortNo?: number;
}

export interface PopularRecommendEditingDTO {
  /** id */
  id?: number;
  /** 游戏类型 GameType */
  gameType?: number;
  /** 房间列表 */
  rooms?: number;
  /** 排序值 */
  popularSortNo?: number;
}

export interface IllustratingGameReportSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 结束时间 */
  gameCode?: string;
  /** 房间id */
  roomID?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface IllustratingMemberGameReportDTO {
  /** 虎卡：IllustratingCard */
  tigerCard?: number;
  /** 龙卡：IllustratingCard */
  dragonCard?: number;
  /** 虎下注金额 */
  tigerAmount?: number;
  /** 虎 +收益 -亏损 */
  tigerProfit?: number;
  /** 龙下注金额 */
  dragonAmount?: number;
  /** 龙下注 +收益 -亏损 */
  dragonProfit?: number;
  /** 和下注金额 */
  tieAmount?: number;
  /** 和下注 +收益 -亏损 */
  tieProfit?: number;
  /** memberID */
  memberID?: number;
  /** 用户名字 */
  memberName?: string;
  /** 玩家类型 PlayerType */
  playerType?: number;
  /** 下注次数 */
  betTimes?: number;
  /** 总下注金额 */
  totalBetAmount?: number;
  /** 总盈利 + 赢利 -亏损 */
  totalProfit?: number;
  /** ip */
  ip?: string;
  /** 单号 */
  id?: number;
  /** 房间id */
  roomID?: number;
  /** 房间号 */
  roomNo?: number;
  /** 场号(value =第几场） */
  screeningNo?: number;
  /** 场编号 */
  screeningCode?: string;
  /** 游戏编号 */
  gameCode?: string;
  /** 游戏时间 */
  gameTime?: string;
  /** 游戏号（第几局） */
  gameNo?: number;
  /** 完成模式 1 正常，-1  正在结束中 其他的为异常 */
  finishMode?: number;
  /** 结果：赢了的赌注 1，百家乐BaccaratBet，2，龙虎IllustratingBet 3牛牛CattleBet */
  winBets?: number;
  /** 结果：赢方 1，百家乐BaccaratWinCamp，2，龙虎IllustratingWinCamp 3牛牛CattleWinCamp */
  winCamp?: number;
}

export interface IllustratingMemberGameReportSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface IllustratingReportSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface IllustratingRoomReportSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface SystemNoticeDTO {
  /** id */
  id?: number;
  /** 1:过期的 2:播放中 3:未播放  */
  state?: number;
  /** 1 Web 2 App端 */
  clientCategorys?: number;
  /** 内容 */
  content?: string;
  /** 开始通知时间 */
  startNoticeTime?: string;
  /** 结束通知时间 */
  endNoticeTime?: string;
}

export interface AdminPlayerDTO {
  /** 用户id */
  playerID?: number;
  /** 账号 */
  account?: string;
  /** 真实姓名 */
  realName?: string;
  /** 用户注册时间 */
  registerTime?: string;
  /** 余额 */
  amount?: number;
  /** 最近一次在线时间 */
  onlineTime?: string;
  /** 总下注金额 */
  totalBetAmount?: number;
  /** 盈利 + 赢 -输 */
  totalProfit?: number;
  /** 用户状态 UserState */
  userState?: number;
  /** ip */
  ip?: string;
  /** 代理id */
  referrerID?: number;
}

export interface AgencyPlayerDTO {
  /** 充值金额 */
  recharge?: number;
  /** 用户id */
  playerID?: number;
  /** 账号 */
  account?: string;
  /** 真实姓名 */
  realName?: string;
  /** 用户注册时间 */
  registerTime?: string;
  /** 余额 */
  amount?: number;
  /** 最近一次在线时间 */
  onlineTime?: string;
  /** 总下注金额 */
  totalBetAmount?: number;
  /** 盈利 + 赢 -输 */
  totalProfit?: number;
  /** 用户状态 UserState */
  userState?: number;
  /** ip */
  ip?: string;
  /** 代理id */
  referrerID?: number;
}

export interface AgencyPlayerSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** 代理id */
  referrerID?: number;
  /** 账号 */
  name?: string;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface AgencyReportDTO {
  /** 玩家注册数量 */
  registerNum?: number;
  /** 充值金额 */
  recharge?: number;
  /** 下注金额 */
  betAmount?: number;
}

export interface AmountRecordSearchingDTO {
  /** 用户名 */
  playerName?: string;
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** playerID */
  playerID?: number;
  /** 余额修改原因组id AmountAlterCause */
  causes?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface PlayerAmountRecordDTO {
  /** id */
  id?: number;
  /** playerID */
  playerID?: number;
  /** 玩家名 */
  playerName?: string;
  /** 时间 */
  logTime?: string;
  /** 余额修改原由 AmountAlterCauseGroup */
  cause?: number;
  /** 修改前余额数 */
  oldAmount?: string;
  /** 修改后余额数 */
  amount?: string;
  /** 交易额 */
  alterValue?: string;
  /** 修改前冻结余额数 */
  oldFrozenAmount?: string;
  /** 修改后冻结余额数 */
  frozenAmount?: string;
  /** 冻结额 */
  alterFrozenValue?: string;
  /** 余额修改原由参数 可null */
  causePara?: string;
  /** ip */
  ip?: string;
}

export interface PlayerAmountRecordSearchingDTO {
  /** 开始时间 */
  startTime?: string;
  /** 结束时间 */
  endTime?: string;
  /** playerID */
  playerID?: number;
  /** 余额修改原因组id AmountAlterCause */
  causes?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface PlayerAmountReportDTO {
  /** 金额 */
  amount?: number;
  /** 记录数量 */
  recordNum?: number;
}

export interface PlayerSearchingDTO {
  /** 注册开始时间 */
  startRegisterTime?: string;
  /** 注册结束时间 */
  endRegisterTime?: string;
  /** 账号 */
  name?: string;
  /** 代理id */
  referrerID?: number;
  /** 每页大小 */
  pageSize?: number;
  /** 页码，从1开始 */
  pageNo?: number;
  /** 首页首条ID，获取首页或者网页版不需要传 */
  firstID?: number;
}

export interface RechargeAmountOrderDTO {
  /** 金额 */
  amount?: number;
  /** 转账密码 */
  password?: string;
  /** 备注 */
  desc?: string;
}

export interface ReduceAmountOrderDTO {
  /** 扣除对象账号 */
  targetAccount?: string;
  /** 金额 */
  amount?: number;
  /** 备注 */
  desc?: string;
  /** 密码 */
  password?: string;
}

export interface TransferAmountOrderDTO {
  /** 转账对象账号 */
  targetAccount?: string;
  /** 金额 */
  amount?: number;
  /** 转账密码 */
  password?: string;
  /** 备注 */
  desc?: string;
}

export interface PlayerAdvertisingSearchingDTO {
  /** 位置 ADSiteType  */
  siteType?: number;
  /** 1 Web 2 App端 */
  clientCategory?: number;
}

export interface BaccaratBetDTO {
  /** 赌注 1:庄 2:闲 3:和 4:庄对 5:闲对 */
  betID?: number;
  /** 下注成员数量 */
  memberNum?: number;
  /** 总的下注金额 */
  totalBetAmount?: number;
}

export interface BaccaratBetOrderDTO {
  /** 赌注 1:庄 2:闲 3:和 4:庄对 5:闲对 */
  bet?: number;
  /** 金额 */
  amount?: number;
}

export interface Order {
  /** 赌注 1:庄 2:闲 3:和 4:庄对 5:闲对 */
  bet?: number;
  /** 金额 */
  amount?: number;
}

export interface BaccaratBetOrderListDTO {
  /** 房间号 */
  roomID?: number;
  /** 赌注订单 BaccaratBetOrderDTO */
  orders?: Order[];
}

export interface BaccaratFlopCardDTO {
  /** 房间id (翻牌请求可以不传) */
  roomID?: number;
  /** 卡牌位置  1:闲1 2:庄1 3:闲2 4:庄2 5:闲3 6:庄3 */
  positionID?: number;
  /** 卡牌 1:A♠ 2:A♥ 3:A♣ 4:A♦ 5:2♠ 6:2♥ 7:2♣ 8:2♦ 9:3♠ 10:3♥ 11:3♣ 12:3♦ 13:4♠ 14:4♥ 15:4♣ 16:4♦ 17:5♠ 18:5♥ 19:5♣ 20:5♦ 21:6♠ 22:6♥ 23:6♣ 24:6♦ 25:7♠ 26:7♥ 27:7♣ 28:7♦ 29:8♠ 30:8♥ 31:8♣ 32:8♦ 33:9♠ 34:9♥ 35:9♣ 36:9♦ 37:10♠ 38:10♥ 39:10♣ 40:10♦ 41:J♠ 42:J♥ 43:J♣ 44:J♦ 45:Q♠ 46:Q♥ 47:Q♣ 48:Q♦ 49:K♠ 50:K♥ 51:K♣ 52:K♦ */
  cardID?: number;
  /** 可见的 true:玩家可见 false 玩家端未显示 undefined */
  visible?: boolean;
  /** 翻牌至今毫秒数（visible=false时receivedCardMills才有效） */
  receivedCardMills?: number;
}

export interface DisplayMember {
  /** 座位 undefined */
  seat?: string;
  /** memberID */
  memberID?: number;
  /** 玩家名 */
  name?: string;
  /** 赌注金额 */
  betAmount?: number;
}

export interface Card {
  /** 房间id (翻牌请求可以不传) */
  roomID?: number;
  /** 卡牌位置  1:闲1 2:庄1 3:闲2 4:庄2 5:闲3 6:庄3 */
  positionID?: number;
  /** 卡牌 1:A♠ 2:A♥ 3:A♣ 4:A♦ 5:2♠ 6:2♥ 7:2♣ 8:2♦ 9:3♠ 10:3♥ 11:3♣ 12:3♦ 13:4♠ 14:4♥ 15:4♣ 16:4♦ 17:5♠ 18:5♥ 19:5♣ 20:5♦ 21:6♠ 22:6♥ 23:6♣ 24:6♦ 25:7♠ 26:7♥ 27:7♣ 28:7♦ 29:8♠ 30:8♥ 31:8♣ 32:8♦ 33:9♠ 34:9♥ 35:9♣ 36:9♦ 37:10♠ 38:10♥ 39:10♣ 40:10♦ 41:J♠ 42:J♥ 43:J♣ 44:J♦ 45:Q♠ 46:Q♥ 47:Q♣ 48:Q♦ 49:K♠ 50:K♥ 51:K♣ 52:K♦ */
  cardID?: number;
  /** 可见的 true:玩家可见 false 玩家端未显示 undefined */
  visible?: boolean;
  /** 翻牌至今毫秒数（visible=false时receivedCardMills才有效） */
  receivedCardMills?: number;
}

export interface BaccaratGameDTO {
  /** 百家乐赌注对象 - 庄 */
  bankBet?: string;
  /** 百家乐赌注对象 - 闲 */
  playBet?: string;
  /** 百家乐赌注对象 - 和 */
  tieBet?: string;
  /** 百家乐赌注对象 - 庄对 */
  bankPairBet?: string;
  /** 百家乐赌注对象 - 闲对 */
  playPairBet?: string;
  /** 桌面玩家  */
  displayMembers?: DisplayMember[];
  /** 百家乐游戏状态 undefined */
  stateID?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 玩家自己在百家乐游戏的对象 */
  self?: string;
  /** 已经翻开的卡牌 BaccaratFlopCardDTO */
  cards?: Card[];
  /** 游戏编号 */
  gameCode?: string;
}

export interface BaccaratGameModelEditingDTO {
  /** 赌注时间 */
  betTimeMills?: string;
  /** 闲赌注赔偿比率 */
  playReplyRate?: number;
  /** 庄赌注赔偿比率 */
  bankReplyRate?: number;
  /** 和赌注赔偿比率 */
  tieReplyRate?: number;
  /** 闲对赌注赔偿比率 */
  playPairReplyRate?: number;
  /** 庄对赌注赔偿比率 */
  bankPairReplyRate?: number;
}



export interface BaccaratGameOpenDTO {
  /** 桌面玩家 */
  displayMembers?: DisplayMember[];
  /** 房间id */
  roomID?: string;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 游戏编码 */
  gameCode?: string;
}

export interface BaccaratGamePlayerDTO {
  /** 庄下注金额 */
  bankBetAmount?: number;
  /** 闲下注金额 */
  playBetAmount?: number;
  /** 和下注金额 */
  tieBetAmount?: number;
  /** 庄对下注金额 */
  bankPairBetAmount?: number;
  /** 闲对下注金额 */
  playPairBetAmount?: number;
}

export interface BaccaratGameResultDTO {
  /** 房间id */
  roomID?: number;
  /** 庄牌点数 */
  bankPoint?: number;
  /** 闲牌点数 */
  playPoint?: number;
  /** 百家乐游戏赢方 undefined */
  winCampID?: number;
  /** 庄牌类型 undefined */
  bankCardSuitTypeID?: number;
  /** 闲牌类型 undefined */
  playCardSuitTypeID?: number;
}

export interface BaccaratGameResultInfoDTO {
  /** 庄牌类型 undefined */
  bankCardSuitTypeID?: number;
  /** 闲牌类型 undefined */
  playCardSuitTypeID?: number;
  /** 房间ID */
  roomID?: string;
  /** 游戏局编号 */
  gameCode?: string;
  /** 游戏局号 undefined */
  gameNo?: string;
  /** 游戏赢方 1.百家乐：BaccaratWinCamp，2.龙虎：IllustratingWinCamp 3.牛牛：CattleWinCamp */
  winCampID?: number;
}

export interface BaccaratMemberBetDTO {
  /** memberID */
  memberID?: number;
  /** 玩家名 */
  name?: string;
  /** 赌注金额 */
  betAmount?: number;
}

export interface BaccaratPlayerProfileDTO {
  /** playerID */
  playerID?: number;
  /** 常用筹码 Integer */
  chips?: number;
  /** 所有筹码 Integer */
  allChips?: number;
}

export interface GameResult {
  /** 庄牌类型 undefined */
  bankCardSuitTypeID?: number;
  /** 闲牌类型 undefined */
  playCardSuitTypeID?: number;
  /** 房间ID */
  roomID?: string;
  /** 游戏局编号 */
  gameCode?: string;
  /** 游戏局号 undefined */
  gameNo?: string;
  /** 游戏赢方 1.百家乐：BaccaratWinCamp，2.龙虎：IllustratingWinCamp 3.牛牛：CattleWinCamp */
  winCampID?: number;
}

export interface BaccaratRoadDTO {
  /** 百家乐房间id */
  roomID?: number;
  /** 百家乐游戏结果 - 局对象列表 */
  gameResults?: GameResult[];
}

export interface BaccaratRoomDTO {
  /** 游戏 - 局 (可为空) */
  game?: string;
  /** 闲赌注赔偿比率 */
  playReplyRate?: number;
  /** 庄赌注赔偿比率 */
  bankReplyRate?: number;
  /** 和赌注赔偿比率 */
  tieReplyRate?: number;
  /** 闲对赌注赔偿比率 */
  playPairReplyRate?: number;
  /** 庄对赌注赔偿比率 */
  bankPairReplyRate?: number;
  /** 路图 (可为空) */
  road?: string;
  /** 播放地址 */
  videoURL?: string;
  /** 远景播放地址 */
  overlookVideoURL?: string;
  /** 最大没下注次数 */
  maxNoBetTimes?: number;
  /** roomID */
  roomID?: string;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 房间人数 */
  roomMemberNum?: number;
  /** 房间号 */
  roomNo?: number;
  /** 房间名称 */
  name?: string;
  /** 低消 */
  minConsumption?: number;
  /** 高消 */
  maxConsumption?: number;
}

export interface BaccaratRoomInfoDTO {
  /** 路图 (可为空) */
  road?: string;
  /** roomID */
  roomID?: string;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 房间人数 */
  roomMemberNum?: number;
  /** 房间号 */
  roomNo?: number;
  /** 房间名称 */
  name?: string;
  /** 低消 */
  minConsumption?: number;
  /** 高消 */
  maxConsumption?: number;
}

export interface BaccaratRoomStateAlterDTO {
  /** 房间id */
  roomID?: string;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 游戏编码 */
  gameCode?: string;
}



export interface CroupierBaccaratRoomDTO {
  /** 已经翻开的卡牌 */
  cards?: Card[];
  /** 路图 (可为空) */
  road?: string;
  /** roomID */
  roomID?: string;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 房间人数 */
  roomMemberNum?: number;
  /** 房间号 */
  roomNo?: number;
  /** 房间名称 */
  name?: string;
  /** 低消 */
  minConsumption?: number;
  /** 高消 */
  maxConsumption?: number;
}

export interface DefaultBaccaratParamDTO {
  /** 房间id */
  roomID?: number;
  /** 卡牌 BaccaratCard */
  cardID?: number;
  /** 卡牌 BaccaratCardPosition */
  cardPosition?: number;
}

export interface GameBetItemStatisticsDTO {
  /** 赌注 1百家乐BaccaratBet 2，龙虎 IllustratingBet 3，牛牛CattleBet 1:庄 2:闲 3:和 4:庄对 5:闲对 */
  betID?: number;
  /** 下注成员数量 */
  memberNum?: number;
  /** 总的下注金额 */
  totalBetAmount?: number;
}

export interface BetStatistic {
  /** 赌注 1百家乐BaccaratBet 2，龙虎 IllustratingBet 3，牛牛CattleBet 1:庄 2:闲 3:和 4:庄对 5:闲对 */
  betID?: number;
  /** 下注成员数量 */
  memberNum?: number;
  /** 总的下注金额 */
  totalBetAmount?: number;
}

export interface GameBetStatisticsDTO {
  /** 房间ID */
  roomID?: number;
  /** 游戏id */
  gameID?: number;
  /** 游戏注码统计 */
  betStatistics?: BetStatistic[];
}

export interface KickRoomMemberDTO {
  /** 房间id */
  roomID?: number;
}

export interface MemberGameResultDTO {
  /** playerID */
  playerID?: number;
  /** +收益 -亏损 */
  profit?: number;
  /** 房间id */
  roomID?: number;
  /** 游戏类型 1:百家乐 2:龙虎斗 3:牛牛 */
  gameType?: string;
}

export interface Key {}

export interface Value {}

export interface SimpleEntryDTO {
  /** key */
  key?: Key;
  /** value */
  value?: Value;
}

export interface CattleBetDTO {
  /** 赌注 1:庄 2:庄翻倍 3:闲 4:闲翻倍 */
  betID?: number;
  /** 下注成员数量 */
  memberNum?: number;
  /** 总的下注金额 */
  totalBetAmount?: number;
}

export interface CattleFlopCardDTO {
  /** 房间id (翻牌请求可以不传) */
  roomID?: number;
  /** 卡牌位置  1:闲1 2:庄1 3:闲2 4:庄2 5:闲3 6:庄3 7:闲4 8:庄4 9:闲5 10:庄5 */
  positionID?: number;
  /** 卡牌 1:A♠ 2:A♥ 3:A♣ 4:A♦ 5:2♠ 6:2♥ 7:2♣ 8:2♦ 9:3♠ 10:3♥ 11:3♣ 12:3♦ 13:4♠ 14:4♥ 15:4♣ 16:4♦ 17:5♠ 18:5♥ 19:5♣ 20:5♦ 21:6♠ 22:6♥ 23:6♣ 24:6♦ 25:7♠ 26:7♥ 27:7♣ 28:7♦ 29:8♠ 30:8♥ 31:8♣ 32:8♦ 33:9♠ 34:9♥ 35:9♣ 36:9♦ 37:10♠ 38:10♥ 39:10♣ 40:10♦ 41:J♠ 42:J♥ 43:J♣ 44:J♦ 45:Q♠ 46:Q♥ 47:Q♣ 48:Q♦ 49:K♠ 50:K♥ 51:K♣ 52:K♦ */
  cardID?: number;
  /** 可见的 true:玩家可见 false 玩家端未显示 undefined */
  visible?: boolean;
  /** 翻牌至今毫秒数（visible=false时receivedCardMills才有效） */
  receivedCardMills?: number;
}





export interface CattleGameDTO {
  /** 赌注对象 - 庄 */
  bankBet?: string;
  /** 赌注对象 - 庄翻倍 */
  douBankBet?: string;
  /** 赌注对象 - 闲 */
  playBet?: string;
  /** 赌注对象 - 闲翻倍 */
  douPlayBet?: string;
  /** 桌面玩家  */
  displayMembers?: DisplayMember[];
  /** 游戏状态 undefined */
  stateID?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 玩家自己在游戏的对象 */
  self?: string;
  /** 已经翻开的卡牌 CattleFlopCardDTO */
  cards?: Card[];
  /** 游戏编号 */
  gameCode?: string;
}



export interface CattleGameOpenDTO {
  /** 桌面玩家 */
  displayMembers?: DisplayMember[];
  /** 房间id */
  roomID?: string;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 游戏编码 */
  gameCode?: string;
}

export interface CattleGamePlayerDTO {
  /** 庄下注金额 */
  bankBetAmount?: number;
  /** 庄翻倍下注金额 */
  douBankBetAmount?: number;
  /** 闲下注金额 */
  playBetAmount?: number;
  /** 闲翻倍下注金额 */
  douPlayBetAmount?: number;
}

export interface CattleGameResultDTO {
  /** 房间id */
  roomID?: number;
  /** 庄牌点数 */
  bankPoint?: number;
  /** 闲牌点数 */
  playPoint?: number;
  /** 游戏赢方 1:庄 2:闲 */
  winCampID?: number;
  /** 庄牌类型 null:无牛 null:有牛 */
  bankCardSuitTypeID?: number;
  /** 闲牌类型 null:无牛 null:有牛 */
  playCardSuitTypeID?: number;
}

export interface CattleGameResultInfoDTO {
  /** 庄牌类型 null:无牛 null:有牛 */
  bankCardSuitTypeID?: number;
  /** 闲牌类型 null:无牛 null:有牛 */
  playCardSuitTypeID?: number;
  /** 房间ID */
  roomID?: string;
  /** 游戏局编号 */
  gameCode?: string;
  /** 游戏局号 undefined */
  gameNo?: string;
  /** 游戏赢方 1.百家乐：BaccaratWinCamp，2.龙虎：IllustratingWinCamp 3.牛牛：CattleWinCamp */
  winCampID?: number;
}

export interface CattleMemberBetDTO {
  /** memberID */
  memberID?: number;
  /** 玩家名 */
  name?: string;
  /** 赌注金额 */
  betAmount?: number;
}

export interface CattlePlayerProfileDTO {
  /** playerID */
  playerID?: number;
  /** 常用筹码 Integer */
  chips?: number;
  /** 所有筹码 Integer */
  allChips?: number;
}



export interface CattleRoadDTO {
  /** 房间id */
  roomID?: number;
  /** 游戏结果 - 局对象列表 */
  gameResults?: GameResult[];
}

export interface CattleRoomDTO {
  /** 游戏 - 局 (可为空) */
  game?: string;
  /** 闲赌注赔偿比率 */
  playReplyRate?: number;
  /** 庄赌注赔偿比率 */
  bankReplyRate?: number;
  /** 翻倍赌注注赔偿比率列表 */
  douReplyRates?: number;
  /** 路图 (可为空) */
  road?: string;
  /** 预付率 */
  prePyRate?: number;
  /** 播放地址 */
  videoURL?: string;
  /** 远景播放地址 */
  overlookVideoURL?: string;
  /** 最大没下注次数 */
  maxNoBetTimes?: number;
  /** roomID */
  roomID?: string;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 房间人数 */
  roomMemberNum?: number;
  /** 房间号 */
  roomNo?: number;
  /** 房间名称 */
  name?: string;
  /** 低消 */
  minConsumption?: number;
  /** 高消 */
  maxConsumption?: number;
}

export interface CattleRoomInfoDTO {
  /** 路图 (可为空) */
  road?: string;
  /** roomID */
  roomID?: string;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 房间人数 */
  roomMemberNum?: number;
  /** 房间号 */
  roomNo?: number;
  /** 房间名称 */
  name?: string;
  /** 低消 */
  minConsumption?: number;
  /** 高消 */
  maxConsumption?: number;
}

export interface CattleRoomStateAlterDTO {
  /** 房间id */
  roomID?: string;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 游戏编码 */
  gameCode?: string;
}



export interface CroupierCattleRoomDTO {
  /** 已经翻开的卡牌 */
  cards?: Card[];
  /** 路图 (可为空) */
  road?: string;
  /** roomID */
  roomID?: string;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 房间人数 */
  roomMemberNum?: number;
  /** 房间号 */
  roomNo?: number;
  /** 房间名称 */
  name?: string;
  /** 低消 */
  minConsumption?: number;
  /** 高消 */
  maxConsumption?: number;
}

export interface DefaultCattleParamDTO {
  /** 房间id */
  roomID?: number;
  /** 卡牌 CattleCard */
  cardID?: number;
  /** 卡牌 CattleCardPosition */
  cardPosition?: number;
}

export interface BaccaratRoom {
  /** 路图 (可为空) */
  road?: string;
  /** roomID */
  roomID?: string;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 房间人数 */
  roomMemberNum?: number;
  /** 房间号 */
  roomNo?: number;
  /** 房间名称 */
  name?: string;
  /** 低消 */
  minConsumption?: number;
  /** 高消 */
  maxConsumption?: number;
}

export interface IllustratingRoom {
  /** 路图 (可为空) */
  road?: string;
  /** roomID */
  roomID?: string;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 房间人数 */
  roomMemberNum?: number;
  /** 房间号 */
  roomNo?: number;
  /** 房间名称 */
  name?: string;
  /** 低消 */
  minConsumption?: number;
  /** 高消 */
  maxConsumption?: number;
}

export interface CattleRoom {
  /** 路图 (可为空) */
  road?: string;
  /** roomID */
  roomID?: string;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 房间人数 */
  roomMemberNum?: number;
  /** 房间号 */
  roomNo?: number;
  /** 房间名称 */
  name?: string;
  /** 低消 */
  minConsumption?: number;
  /** 高消 */
  maxConsumption?: number;
}

export interface HallDTO {
  /** 热门推荐-百家乐排序值 */
  baccaratSortNum?: number;
  /** 热门推荐-百家乐房间 */
  baccaratRooms?: BaccaratRoom[];
  /** 热门推荐-龙虎排序值 */
  illustratinSortNum?: number;
  /** 热门推荐-龙虎房间 */
  illustratingRooms?: IllustratingRoom[];
  /** 热门推荐-牛牛排序值 */
  cattleSortNum?: number;
  /** 热门推荐-牛牛房间 */
  cattleRooms?: CattleRoom[];
}

export interface CroupierIllustratingRoomDTO {
  /** 虎已经翻开的卡牌 - 可为空 */
  tigerCard?: string;
  /** 龙已经翻开的卡牌 - 可为空 */
  dragonCard?: string;
  /** 路图 (可为空) */
  road?: string;
  /** roomID */
  roomID?: string;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 房间人数 */
  roomMemberNum?: number;
  /** 房间号 */
  roomNo?: number;
  /** 房间名称 */
  name?: string;
  /** 低消 */
  minConsumption?: number;
  /** 高消 */
  maxConsumption?: number;
}

export interface DefaultIllustratingParamDTO {
  /** 房间id */
  roomID?: number;
  /** 卡牌 IllustratingCard */
  cardID?: number;
  /** 卡牌 IllustratingPosition */
  cardPosition?: number;
}

export interface IllustratingBetDTO {
  /** 赌注 1:虎 2:龙 3:和 */
  betID?: number;
  /** 下注成员数量 */
  memberNum?: number;
  /** 总的下注金额 */
  totalBetAmount?: number;
}

export interface IllustratingBetOrderDTO {
  /** 赌注 1:虎 2:龙 3:和 */
  bet?: number;
  /** 金额 */
  amount?: number;
}



export interface IllustratingBetOrderListDTO {
  /** 房间号 */
  roomID?: number;
  /** 赌注订单 IllustratingBetOrderDTO */
  orders?: Order[];
}

export interface IllustratingFlopCardDTO {
  /** 房间id (翻牌请求可以不传) */
  roomID?: number;
  /** 卡牌位置  null:龙1 null:虎1 */
  positionID?: number;
  /** 卡牌 1:A♠ 2:A♥ 3:A♣ 4:A♦ 5:2♠ 6:2♥ 7:2♣ 8:2♦ 9:3♠ 10:3♥ 11:3♣ 12:3♦ 13:4♠ 14:4♥ 15:4♣ 16:4♦ 17:5♠ 18:5♥ 19:5♣ 20:5♦ 21:6♠ 22:6♥ 23:6♣ 24:6♦ 25:7♠ 26:7♥ 27:7♣ 28:7♦ 29:8♠ 30:8♥ 31:8♣ 32:8♦ 33:9♠ 34:9♥ 35:9♣ 36:9♦ 37:10♠ 38:10♥ 39:10♣ 40:10♦ 41:J♠ 42:J♥ 43:J♣ 44:J♦ 45:Q♠ 46:Q♥ 47:Q♣ 48:Q♦ 49:K♠ 50:K♥ 51:K♣ 52:K♦ */
  cardID?: number;
  /** 可见的 true:玩家可见 false 玩家端未显示 undefined */
  visible?: boolean;
  /** 翻牌至今毫秒数（visible=false时receivedCardMills才有效） */
  receivedCardMills?: number;
}



export interface IllustratingGameDTO {
  /** 赌注对象 - 虎 */
  tigerBet?: string;
  /** 赌注对象 - 龙 */
  dragonBet?: string;
  /** 赌注对象 - 和 */
  tieBet?: string;
  /** 桌面玩家  */
  displayMembers?: DisplayMember[];
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 玩家自己在游戏的对象 */
  self?: string;
  /** 虎已经翻开的卡牌 - 可为空 */
  tigerCard?: string;
  /** 龙已经翻开的卡牌 - 可为空 */
  dragonCard?: string;
  /** 游戏编号 */
  gameCode?: string;
}



export interface IllustratingGameOpenDTO {
  /** 桌面玩家 */
  displayMembers?: DisplayMember[];
  /** 房间id */
  roomID?: string;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 游戏编码 */
  gameCode?: string;
}

export interface IllustratingGamePlayerDTO {
  /** 虎下注金额 */
  tigerBetAmount?: number;
  /** 龙下注金额 */
  dragonBetAmount?: number;
  /** 和下注金额 */
  tieBetAmount?: number;
}

export interface IllustratingGameResultDTO {
  /** 房间id */
  roomID?: number;
  /** 龙点数 */
  dragonPoint?: number;
  /** 虎点数 */
  tigerPoint?: number;
  /** 游戏赢方 undefined */
  winCampID?: number;
}

export interface IllustratingGameResultInfoDTO {
  /** 房间ID */
  roomID?: string;
  /** 游戏局编号 */
  gameCode?: string;
  /** 游戏局号 undefined */
  gameNo?: string;
  /** 游戏赢方 1.百家乐：BaccaratWinCamp，2.龙虎：IllustratingWinCamp 3.牛牛：CattleWinCamp */
  winCampID?: number;
}

export interface IllustratingMemberBetDTO {
  /** memberID */
  memberID?: number;
  /** 玩家名 */
  name?: string;
  /** 赌注金额 */
  betAmount?: number;
}

export interface IllustratingPlayerProfileDTO {
  /** playerID */
  playerID?: number;
  /** 常用筹码 Integer */
  chips?: number;
  /** 所有筹码 Integer */
  allChips?: number;
}



export interface IllustratingRoadDTO {
  /** 房间id */
  roomID?: number;
  /** 龙虎游戏结果 - 局 */
  gameResults?: GameResult[];
}

export interface IllustratingRoomDTO {
  /** 游戏 - 局 (可为空) */
  game?: string;
  /** 龙赌注赔偿比率 */
  dragonReplyRate?: number;
  /** 虎赌注赔偿比率 */
  tigerReplyRate?: number;
  /** 和赌注赔偿比率 */
  tieReplyRate?: number;
  /** 路图 (可为空) */
  road?: string;
  /** 播放地址 */
  videoURL?: string;
  /** 远景播放地址 */
  overlookVideoURL?: string;
  /** 最大没下注次数 */
  maxNoBetTimes?: number;
  /** roomID */
  roomID?: string;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 房间人数 */
  roomMemberNum?: number;
  /** 房间号 */
  roomNo?: number;
  /** 房间名称 */
  name?: string;
  /** 低消 */
  minConsumption?: number;
  /** 高消 */
  maxConsumption?: number;
}

export interface IllustratingRoomInfoDTO {
  /** 路图 (可为空) */
  road?: string;
  /** roomID */
  roomID?: string;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 房间人数 */
  roomMemberNum?: number;
  /** 房间号 */
  roomNo?: number;
  /** 房间名称 */
  name?: string;
  /** 低消 */
  minConsumption?: number;
  /** 高消 */
  maxConsumption?: number;
}

export interface IllustratingRoomStateAlterDTO {
  /** 房间id */
  roomID?: string;
  /** 房间的状态 1:下注阶段 2:结算 3:洗牌（场结算） 4:房间暂停状态 6:房间关闭状态 7:局结束状态 8:局通关状态 */
  state?: number;
  /** 剩余下注倒计时：毫秒 */
  betRemainMills?: number;
  /** 场号（第几场） */
  sceneNo?: number;
  /** 当前局号（第几局） */
  gameNo?: number;
  /** 游戏编码 */
  gameCode?: string;
}

export interface BetOrderDTO {
  /** 赌注 1. 牛牛CattleBet */
  bet?: number;
  /** 金额 */
  amount?: number;
}



export interface BetOrderListDTO {
  /** 房间号 */
  roomID?: number;
  /** 赌注订单 */
  orders?: Order[];
}

export interface GameCardResetDTO {
  /** 房间id */
  roomID?: number;
  /** 房间状态 */
  roomState?: number;
}

export interface GameInvalidatedDTO {
  /** 房间 */
  roomID?: number;
}

export interface MDBetableDisplayMemberDTO {
  /** 座位 undefined */
  seat?: string;
  /** memberID */
  memberID?: number;
  /** 玩家名 */
  name?: string;
  /** 赌注金额 */
  betAmount?: number;
}

export interface NoBetWarningDTO {
  /** 没下注次数 */
  noBetTimes?: number;
  /** 最大没下注次数 */
  maxNoBetTimes?: number;
}

export interface PlayerBetRecordDTO {
  /** 赌注 1.百家乐BaccaratBet 2，龙虎 IllustratingBet 3，牛牛CattleBet */
  betID?: number;
  /** 金额 */
  amount?: number;
}

export interface PlayerSystemNoticesSearchingDTO {
  /** 1 Web 2 App端 */
  clientCategory?: number;
}

export interface GameRechargeRequestDTO {
  /** 支付金额 */
  amount?: number;
  /** 支付方式 1:支付宝 2:微信 3:银行卡 */
  capitalSource?: number;
  /** 成功地址 */
  succeedURL?: string;
  /** 客户端类型 1:Web 2:安卓 3:苹果 */
  clientType?: number;
}

export interface GameRechargeResultDTO {
  /** 是否成功 undefined */
  succeed?: string;
  /** 信息 */
  msg?: string;
  /** 充值url */
  rechargeURL?: string;
}

export interface GameWithdrawalRequestDTO {
  /** 开户银行 */
  bank?: number;
  /** 开户银行账户 */
  bankAccount?: string;
  /** 提现金额 */
  amount?: number;
  /** 提现方式 1:支付宝 2:微信 3:银行卡 */
  capitalSource?: number;
  /** 客户端类型 1:WEBWeb 2:安卓 3:苹果 */
  clientType?: number;
  /** 提现密码 */
  withdrawalPassword?: string;
}

export interface GameWithdrawalResultDTO {
  /** 是否成功 undefined */
  succeed?: string;
  /** 信息 */
  msg?: string;
}

export interface RoomMemberNumDTO {
  /** 房间id */
  roomID?: number;
  /** 成员数量 */
  memberNum?: number;
}



export interface RoomMemberNumListDTO {
  /** 房间成员数量 列表 */
  rooms?: Room[];
}

export interface PasswordEditingDTO {
  /** 旧密码 */
  oldPassword?: string;
  /** 旧密码 */
  newPassword?: string;
}

export interface PlayerAmountAlterDTO {
  /** 旧值 */
  oldAmount?: number;
  /** 改变量 */
  alterAmount?: number;
  /** 新值 */
  amount?: number;
  /** 改变原因 1:下注 2:盈利 3:充值 4:冻结 5:下注错误归还 6:管理员转账 7:下分 8:提现 9:提现失败 10:纠错-赔偿 11:纠错-扣除 12:推广员赠送 */
  cause?: number;
}

export interface PlayerBeBandDTO {
  /** 用户状态 1:正常 2:封号 */
  state?: number;
}

export interface PlayerDTO {
  /** 玩家ID */
  id?: number;
  /** 余额 */
  amount?: number;
  /** 玩家名 */
  name?: string;
}

export interface ResponseObject {
  EnumDTO?: EnumDTO;
  ResultDTO?: ResultDTO;
  AdvertisingDTO?: AdvertisingDTO[];
  BaccaratGameReportSearchingDTO?: BaccaratGameReportSearchingDTO;
  BaccaratMemberGameReportDTO?: BaccaratMemberGameReportDTO;
  BaccaratMemberGameReportSearchingDTO?: BaccaratMemberGameReportSearchingDTO;
  BaccaratNewestRoomReportSearchingDTO?: BaccaratNewestRoomReportSearchingDTO;
  BaccaratReportSearchingDTO?: BaccaratReportSearchingDTO;
  BaccaratRoomReportSearchingDTO?: BaccaratRoomReportSearchingDTO;
  IntListDTO?: IntListDTO;
  ListDTO?: ListDTO[];
  MDBetableGameReportSearchingDTO?: MDBetableGameReportSearchingDTO;
  MemberGameReportSearchingDTO?: MemberGameReportSearchingDTO;
  PageDTO?: PageDTO;
  PagingDTO?: PagingDTO;
  PlayerMemberGameReportSearchingDTO?: PlayerMemberGameReportSearchingDTO;
  CattleGameReportSearchingDTO?: CattleGameReportSearchingDTO;
  CattleMemberGameReportDTO?: CattleMemberGameReportDTO;
  CattleMemberGameReportSearchingDTO?: CattleMemberGameReportSearchingDTO;
  CattleReportSearchingDTO?: CattleReportSearchingDTO;
  CattleRoomReportSearchingDTO?: CattleRoomReportSearchingDTO;
  PopularRecommendCreationDTO?: PopularRecommendCreationDTO;
  PopularRecommendDTO?: PopularRecommendDTO;
  RoomTinyDTO?: RoomTinyDTO;
  PopularRecommendEditingDTO?: PopularRecommendEditingDTO;
  IllustratingGameReportSearchingDTO?: IllustratingGameReportSearchingDTO;
  IllustratingMemberGameReportDTO?: IllustratingMemberGameReportDTO;
  IllustratingMemberGameReportSearchingDTO?: IllustratingMemberGameReportSearchingDTO;
  IllustratingReportSearchingDTO?: IllustratingReportSearchingDTO;
  IllustratingRoomReportSearchingDTO?: IllustratingRoomReportSearchingDTO;
  SystemNoticeDTO?: SystemNoticeDTO;
  AdminPlayerDTO?: AdminPlayerDTO;
  AgencyPlayerDTO?: AgencyPlayerDTO;
  AgencyPlayerSearchingDTO?: AgencyPlayerSearchingDTO;
  AgencyReportDTO?: AgencyReportDTO;
  AmountRecordSearchingDTO?: AmountRecordSearchingDTO;
  PlayerAmountRecordDTO?: PlayerAmountRecordDTO;
  PlayerAmountRecordSearchingDTO?: PlayerAmountRecordSearchingDTO;
  PlayerAmountReportDTO?: PlayerAmountReportDTO;
  PlayerSearchingDTO?: PlayerSearchingDTO;
  RechargeAmountOrderDTO?: RechargeAmountOrderDTO;
  ReduceAmountOrderDTO?: ReduceAmountOrderDTO;
  TransferAmountOrderDTO?: TransferAmountOrderDTO;
  PlayerAdvertisingSearchingDTO?: PlayerAdvertisingSearchingDTO;
  BaccaratBetDTO?: BaccaratBetDTO;
  BaccaratBetOrderDTO?: BaccaratBetOrderDTO;
  BaccaratBetOrderListDTO?: BaccaratBetOrderListDTO;
  BaccaratFlopCardDTO?: BaccaratFlopCardDTO;
  BaccaratGameDTO?: BaccaratGameDTO;
  BaccaratGameModelEditingDTO?: BaccaratGameModelEditingDTO;
  BaccaratGameOpenDTO?: BaccaratGameOpenDTO;
  BaccaratGamePlayerDTO?: BaccaratGamePlayerDTO;
  BaccaratGameResultDTO?: BaccaratGameResultDTO;
  BaccaratGameResultInfoDTO?: BaccaratGameResultInfoDTO;
  BaccaratMemberBetDTO?: BaccaratMemberBetDTO;
  BaccaratPlayerProfileDTO?: BaccaratPlayerProfileDTO;
  BaccaratRoadDTO?: BaccaratRoadDTO;
  BaccaratRoomDTO?: BaccaratRoomDTO;
  BaccaratRoomInfoDTO?: BaccaratRoomInfoDTO[];
  BaccaratRoomStateAlterDTO?: BaccaratRoomStateAlterDTO;
  CroupierBaccaratRoomDTO?: CroupierBaccaratRoomDTO;
  DefaultBaccaratParamDTO?: DefaultBaccaratParamDTO;
  GameBetItemStatisticsDTO?: GameBetItemStatisticsDTO;
  GameBetStatisticsDTO?: GameBetStatisticsDTO;
  KickRoomMemberDTO?: KickRoomMemberDTO;
  MemberGameResultDTO?: MemberGameResultDTO;
  SimpleEntryDTO?: SimpleEntryDTO;
  CattleBetDTO?: CattleBetDTO;
  CattleFlopCardDTO?: CattleFlopCardDTO;
  CattleGameDTO?: CattleGameDTO;
  CattleGameOpenDTO?: CattleGameOpenDTO;
  CattleGamePlayerDTO?: CattleGamePlayerDTO;
  CattleGameResultDTO?: CattleGameResultDTO;
  CattleGameResultInfoDTO?: CattleGameResultInfoDTO;
  CattleMemberBetDTO?: CattleMemberBetDTO;
  CattlePlayerProfileDTO?: CattlePlayerProfileDTO;
  CattleRoadDTO?: CattleRoadDTO;
  CattleRoomDTO?: CattleRoomDTO;
  CattleRoomInfoDTO?: CattleRoomInfoDTO[];
  CattleRoomStateAlterDTO?: CattleRoomStateAlterDTO;
  CroupierCattleRoomDTO?: CroupierCattleRoomDTO;
  DefaultCattleParamDTO?: DefaultCattleParamDTO;
  HallDTO?: HallDTO;
  CroupierIllustratingRoomDTO?: CroupierIllustratingRoomDTO;
  DefaultIllustratingParamDTO?: DefaultIllustratingParamDTO;
  IllustratingBetDTO?: IllustratingBetDTO;
  IllustratingBetOrderDTO?: IllustratingBetOrderDTO;
  IllustratingBetOrderListDTO?: IllustratingBetOrderListDTO;
  IllustratingFlopCardDTO?: IllustratingFlopCardDTO;
  IllustratingGameDTO?: IllustratingGameDTO;
  IllustratingGameOpenDTO?: IllustratingGameOpenDTO;
  IllustratingGamePlayerDTO?: IllustratingGamePlayerDTO;
  IllustratingGameResultDTO?: IllustratingGameResultDTO;
  IllustratingGameResultInfoDTO?: IllustratingGameResultInfoDTO;
  IllustratingMemberBetDTO?: IllustratingMemberBetDTO;
  IllustratingPlayerProfileDTO?: IllustratingPlayerProfileDTO;
  IllustratingRoadDTO?: IllustratingRoadDTO;
  IllustratingRoomDTO?: IllustratingRoomDTO;
  IllustratingRoomInfoDTO?: IllustratingRoomInfoDTO;
  IllustratingRoomStateAlterDTO?: IllustratingRoomStateAlterDTO;
  BetOrderDTO?: BetOrderDTO;
  BetOrderListDTO?: BetOrderListDTO;
  GameCardResetDTO?: GameCardResetDTO;
  GameInvalidatedDTO?: GameInvalidatedDTO;
  MDBetableDisplayMemberDTO?: MDBetableDisplayMemberDTO;
  NoBetWarningDTO?: NoBetWarningDTO;
  PlayerBetRecordDTO?: PlayerBetRecordDTO[];
  PlayerSystemNoticesSearchingDTO?: PlayerSystemNoticesSearchingDTO;
  GameRechargeRequestDTO?: GameRechargeRequestDTO;
  GameRechargeResultDTO?: GameRechargeResultDTO;
  GameWithdrawalRequestDTO?: GameWithdrawalRequestDTO;
  GameWithdrawalResultDTO?: GameWithdrawalResultDTO;
  RoomMemberNumDTO?: RoomMemberNumDTO;
  RoomMemberNumListDTO?: RoomMemberNumListDTO;
  PasswordEditingDTO?: PasswordEditingDTO;
  PlayerAmountAlterDTO?: PlayerAmountAlterDTO;
  PlayerBeBandDTO?: PlayerBeBandDTO;
  PlayerDTO?: PlayerDTO;
}