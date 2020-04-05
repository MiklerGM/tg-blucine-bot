export default interface CommandInterface {
  regexp: RegExp;
  command(msg: any, match: any): Promise<void>;
  response(query: any): Promise<void>;
};
