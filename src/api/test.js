import service from '@/utils/request.js';

/**
 * @description 歌手分类列表
 * @param limit : 返回数量 , 默认为 30
 * @param offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认 为 0
 * @param initial : 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0
 * @param type : -1:全部 1:男歌手 2:女歌手 3:乐队
 * @param area : 地区, 默认为全部, 可选值为-1:全部 7:华语 96:欧美 8:日本 16:韩国 0:其他
 * @param time : 时间排序, 默认为 0, 可选值为 0, 1
 * @returns
 */
export function artistList() {
  return service({
    method: 'get',
    url: `/artist/list`,
  });
}
