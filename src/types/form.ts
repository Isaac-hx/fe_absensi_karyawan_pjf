//This file contain what data should be send
export type AbsenFormValues = {
  employee_id:string,
  url_profile:string,
  url_signature:string,
  target_work?:string,
  result_work?:string,
  location?:string,
  create_date?:string,
  check_in:number,
  check_out:number
 

};

export type KaryawanFormValues = {
  nama:string,
  email:string,
  telp:string,
  jenis_kelamin:string,
};

