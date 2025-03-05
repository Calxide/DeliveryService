import { ObjectId } from 'mongoose';

export class Package {
    _id?: string;
    package_title: string;
    package_weight: number;
    package_destination: string;
    driver_id: string;
    package_description?: string;
    package_is_allocated?: boolean;
    package_id: string; 
    createdAt: Date;
  
    constructor(

      package_title: string,
      package_weight: number,
      package_destination: string,
      driver_id: string,
      createdAt: Date,
      package_id: string, 
      package_is_allocated: boolean,
      package_description?: string,

      

    ) {

      this.package_title = package_title;
      this.package_weight = package_weight;
      this.package_destination = package_destination;
      this.driver_id = driver_id;
      this.package_description = package_description;
      this.package_is_allocated = package_is_allocated;
      this.package_id = package_id || ''; 
      this.createdAt = createdAt;
    }
  }
  