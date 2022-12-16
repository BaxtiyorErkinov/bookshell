import { Md5 } from 'ts-md5';

interface IProps {
  req: string;
  host: string;
  endpoint: string;
  body?: string;
  secretkey: string;
}

export function md5Generator(props: IProps) {
  console.log(props);
  const hash = Md5.hashStr(
    `${props.req}${props.host}${props.endpoint}${props?.body}${props.secretkey}`,
  );

  return hash;
}
