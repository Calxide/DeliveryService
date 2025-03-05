import { ObjectId } from 'mongodb'; 

export class Driver {
  _id?: ObjectId;
  driver_name: string;
  driver_department: 'Food' | 'Furniture' | 'Electronic';
  driver_license: string;
  driver_id: string; 
  driver_is_active: boolean;
  driver_createdAt: Date;
  assigned_packages?: string[];

  constructor(
    driver_name: string,
    driver_department: 'Food' | 'Furniture' | 'Electronic',
    driver_license: string,
    driver_createdAt: Date,
    driver_id: string = '', 
    driver_is_active: boolean = false,
    assigned_packages?: string[]
  ) {

    this.driver_name = driver_name;
    this.driver_department = driver_department;
    this.driver_license = driver_license;
    this.driver_createdAt = driver_createdAt;
    this.driver_id = driver_id;
    this.driver_is_active = driver_is_active;
    this.assigned_packages = assigned_packages;
  }
}
