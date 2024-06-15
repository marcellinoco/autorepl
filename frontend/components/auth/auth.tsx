"use client";

import { FC } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import SignIn from "./sign-in";

const Auth: FC = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Tabs defaultValue="sign-in" className="w-[400px]">
        <TabsContent value="sign-in">
          <SignIn />
        </TabsContent>
      </Tabs>
    </div>
  );
};

Auth.displayName = "Auth";
export default Auth;
