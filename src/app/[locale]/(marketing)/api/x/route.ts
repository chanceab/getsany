import { exec } from 'node:child_process';
import util from 'node:util';

import { NextResponse } from 'next/server';

// type YouGetOutput = {
//   data: any;
//   status: number;
// };

const execPromise = util.promisify(exec);

const regex = /^(?:https?:\/\/)?(?:www\.)?(?:x\.com|twitter\.com)\/\w+\/status\/\d+$/;

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: '请提供视频链接' },
        { status: 400 },
      );
    }

    if (!regex.test(url)) {
      return NextResponse.json(
        { error: '请提供有效的 X 平台视频链接' },
        { status: 500 },
      );
    }

    // 执行 you-get 命令获取视频信息
    const { stdout } = await execPromise(`you-get --json ${url}`);

    return NextResponse.json(
      { data: stdout },
      { status: 200 },
    );

    // const { data, status } = parseYouGetOutput(stdout);

    // if (status !== 200) {
    //   return NextResponse.json(
    //     { error: JSON.stringify({ data, status }) },
    //     { status },
    //   );
    // }

    // return NextResponse.json({ data: JSON.stringify({ data, status }) }, { status });
  } catch (error) {
    console.error('下载处理错误:', error);
    return NextResponse.json(
      { error: '视频下载失败，请稍后重试' },
      { status: 500 },
    );
  }
}

// 获取 you-get 输出中的实际视频 URL
// function parseYouGetOutput(output: string): YouGetOutput {
//   // 判断是否为JSON

//   try {
//     // 尝试解析为 JSON
//     const jsonOutput = JSON.parse(output);
//     return {
//       data: jsonOutput,
//       status: 200,
//     };
//   } catch (e) {
//     console.error('解析 JSON 错误:', e);

//     return {
//       data: e,
//       status: 500,
//     };
//   }
// }
