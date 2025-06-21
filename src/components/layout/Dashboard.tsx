import type React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Users } from "lucide-react";
const Dashboard: React.FC = () => {
  return (
    <div className="">
      {/* Header */}
      <section>
      </section>
      {/* End header */}

      {/* Body */}
      <section className="grid grid-cols-3 md:grid-cols-2 justify-items-center container">
          <Card className="md:w-[280px]">
          <CardHeader>
            <div className="flex items-center gap-2">
               <div className="bg-emerald-500 text-emerald-200 rounded-full w-fit p-2"> 
                <Users  />
              </div>
              <div>
                <CardTitle className="text-xl md:text-lg">Jumlah Karyawan</CardTitle>
              </div>              
            </div>

          </CardHeader>
          <CardContent>
            <p className="text-4xl">30</p>
          </CardContent>
        </Card>
                <Card className="md:w-[280px]">
          <CardHeader>
            <div className="flex items-center gap-2">
               <div className="bg-emerald-500 text-emerald-200 rounded-full w-fit p-2"> 
                <Users  />
              </div>
              <div>
                <CardTitle className="text-xl md:text-lg">Jumlah User</CardTitle>
              </div>              
            </div>

          </CardHeader>
          <CardContent>
            <p className="text-4xl">30</p>
          </CardContent>
        </Card>
                <Card className="md:w-[280px]">
          <CardHeader>
            <div className="flex items-center gap-2">
               <div className="bg-emerald-500 text-emerald-200 rounded-full w-fit p-2"> 
                <Users  />
              </div>
              <div>
                <CardTitle className="text-xl md:text-lg">Jumlah Karyawan</CardTitle>
              </div>              
            </div>

          </CardHeader>
          <CardContent>
            <p className="text-4xl">30</p>
          </CardContent>
        </Card>
      

      </section>
      {/* End body */}
    </div>
  );
};

export default Dashboard;