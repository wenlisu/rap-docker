
// 去除字符串尾部空格或指定字符
export function trimEnd(str: string, c?: any) {
  if (c == undefined || c == "") {
      let rg = /s/;
      let i = str.length;
      while (rg.test(str.charAt(--i)));
      return str.slice(0, i + 1);
  }
  else {
      let rg = new RegExp(c);
      let i = str.length;
      while (rg.test(str.charAt(--i)));
      return str.slice(0, i + 1);
  }
}