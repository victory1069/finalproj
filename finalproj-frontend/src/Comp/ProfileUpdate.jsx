import React, { useEffect, useState, useRef } from "react";
import axios from "../axiosConifg";
import { toast } from "sonner";
import { useUser } from "../contexts/UserContext";
import { formatCurrency } from "../utilities";
import { CiEdit } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { AiOutlineLoading } from "react-icons/ai";

const ProfileUpdate = () => {
  const [isEditNameOpen, setIsEditNameOpen] = useState(false);
  const [isEditPasswordOpen, setIsEditPasswordOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [nameLoading, setNameLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const { user, setUser } = useUser();
  const nameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const openEditName = (event) => {
    event.preventDefault();
    setIsEditNameOpen(true);
    setTimeout(() => nameInputRef.current.focus(), 0);
  };

  const openEditPassword = (event) => {
    event.preventDefault();
    setIsEditPasswordOpen(true);
    setTimeout(() => passwordInputRef.current.focus(), 0);
  };

  const handleCancelNameChange = (event) => {
    event.preventDefault();
    setName(user.name);
    setIsEditNameOpen(false);
  };

  const handleCancelPasswordChange = (event) => {
    event.preventDefault();
    setOldPassword("");
    setNewPassword("");
    setIsEditPasswordOpen(false);
  };

  const handleUpdateName = async (event) => {
    event.preventDefault();
    setPasswordLoading(true);
    try {
      if (!name) {
        toast.error("Please input a name");
        return;
      }
      const res = await axios.put(
        "/user/updateUsername",
        { newName: name },
        {
          headers: {
            "x-auth-token": user._id,
          },
        }
      );
      localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success("Name updated successfully");
      setName(user.name);
      setIsEditNameOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to update name: ${error.response.data.msg} `);
    } finally {
      setNameLoading(false);
    }
  };

  const handleUpdatePasswordChange = async (event) => {
    event.preventDefault();
    setPasswordLoading(true);
    try {
      if (!newPassword || !oldPassword) {
        toast.error("Please input your old and new password");
        return;
      }
      const res = await axios.put(
        "/user/updatePassword",
        { newPassword, oldPassword },
        {
          headers: {
            "x-auth-token": user._id,
          },
        }
      );
      localStorage.setItem("loggedInUser", JSON.stringify(res.data.user));
      setUser(res.data.user);
      toast.success("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setIsEditPasswordOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to update password: ${error.response.data.msg} `);
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black font-agrandir placeholder:text-black">
      <main className="text-center p-6 w-full max-w-5xl bg-white bg-opacity-50 rounded-lg shadow-lg">
        <form className="bg-opacity-0 p-8 rounded-lg mx-auto font-agrandir">
          <div className="w-full flex items-center justify-between border-b pb-8">
            <div>
              <div className="w-64 h-auto">
                <img
                  src="https://cdn3.iconfinder.com/data/icons/web-design-and-development-2-6/512/87-1024.png"
                  alt=""
                />
              </div>
            </div>
            <div className="text-white flex flex-col items-start gap-6">
              <span className="text-4xl xl:text-[64px] font-black">
                {formatCurrency(user?.walletBalance / 100)}
              </span>
              <div className="flex flex-col gap-2 items-start text-start">
                <span className="text-xl xl:text-2xl font-bold">
                  {user?.name}
                </span>
                <span className="text-lg xl:text-xl font-medium">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>
          <div className="text-start mt-8 text-white w-full text-xl">
            <span className="text-2xl font-bold">Profile Details</span>
            <div className="mt-4 flex flex-col justify-center gap-2">
              <div className="grid grid-cols-[8rem_auto_8rem] items-center">
                <span>Name:</span>
                <div className="pr-2 w-full">
                  {isEditNameOpen ? (
                    <input
                      ref={nameInputRef}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-inherit rounded-md border focus:outline-none w-full"
                    />
                  ) : (
                    <span onClick={(event) => openEditName(event)}>
                      {user?.name}
                    </span>
                  )}
                </div>

                {!isEditNameOpen ? (
                  <button
                    className="px-4"
                    onClick={(event) => openEditName(event)}
                  >
                    <CiEdit size={32} />
                  </button>
                ) : (
                  <div className="w-full flex px-4 gap-4">
                    <button onClick={(event) => handleCancelNameChange(event)}>
                      <MdOutlineCancel size={32} />
                    </button>
                    <button
                      onClick={(event) => handleUpdateName(event)}
                      disabled={nameLoading}
                      className="flex items-center"
                    >
                      {nameLoading ? (
                        <span className="inline-block animate-spin">
                          <AiOutlineLoading size={32} />
                        </span>
                      ) : (
                        <RiCheckboxCircleLine size={32} />
                      )}
                    </button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-[8rem_auto_8rem] items-center w-full mt-4">
                <span>Password:</span>
                {isEditPasswordOpen ? (
                  <div className="flex flex-col gap-2 pr-3">
                    <label htmlFor="">Old Password</label>
                    <input
                      ref={passwordInputRef}
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      className="bg-inherit rounded-md border focus:outline-none w-full"
                      type="password"
                    />
                    <label htmlFor="">New Password</label>
                    <input
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-inherit rounded-md border focus:outline-none w-full"
                      type="password"
                    />
                  </div>
                ) : (
                  <span onClick={(event) => openEditPassword(event)}>
                    ************
                  </span>
                )}
                {!isEditPasswordOpen ? (
                  <button
                    className="px-4"
                    onClick={(event) => openEditPassword(event)}
                  >
                    <CiEdit size={32} />
                  </button>
                ) : (
                  <div className="w-full flex px-4 gap-4">
                    <button
                      onClick={(event) => handleCancelPasswordChange(event)}
                    >
                      <MdOutlineCancel size={32} />
                    </button>
                    <button
                      onClick={(event) => handleUpdatePasswordChange(event)}
                      disabled={passwordLoading}
                      className="flex items-center"
                    >
                      {passwordLoading ? (
                        <span className="inline-block animate-spin">
                          <AiOutlineLoading size={32} />
                        </span>
                      ) : (
                        <RiCheckboxCircleLine size={32} />
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProfileUpdate;
