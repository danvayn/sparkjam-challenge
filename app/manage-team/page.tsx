"use client";
import { NextPage } from "next";
import { MOCK_OPEN_AI_TEAM, MockUser } from "@/app/manage-team/mockData";
import BanUserCard from "@/app/manage-team/BanUserCard";
import { useState } from "react";
import ModalContextProvider from "@/components/utilityComponents/ModalContext";

const ManageTeamPage: NextPage = () => {
  const [team, setTeam] = useState<MockUser[]>(MOCK_OPEN_AI_TEAM);

  const handleRemoveTeamMember = (userName: string) => {
    setTeam(team.filter((user) => user.name !== userName));
  };

  return (
    <ModalContextProvider>
      <div className="h-[100dvh] w-[100vw] flex-center bg-neutral-200">
        <div className=" flex-center w-[400px] gap-8">
          <h1 className="text-4xl w-[100%]">Manage Open A.I.</h1>
          <div className="flex flex-col w-[100%] items-stretch gap-4">
            {team.map((user) => (
              <BanUserCard
                key={user.image}
                user={user}
                onRemoveTeamMember={handleRemoveTeamMember}
              />
            ))}
          </div>
        </div>
      </div>
    </ModalContextProvider>
  );
};

export default ManageTeamPage;
