//This file contain what data should be send
export type AbsenFormValues = {
  karyawan_id:number,
  url_profile:string,
  url_signature:string,
  target_work?:string,
  result_work?:string,
  location?:string,
  create_date?:string,
  check_in?:string,
  check_out?:string
 

};

export type KaryawanFormValues = {
  name:string,
  email:string,
  no_telp:string,
  gender:string,
};

export type UserFormValues = {
  username:string
  password?:string
  confirm_password?:string
  status: string
}
