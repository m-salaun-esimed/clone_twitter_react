import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getName } from "../../../domains/user/user";
import { Button } from "@mui/material";
import { showToastSuccess, showToastError } from "../../../shared/utils/Toast";
import { counterFollowed, counterFollower, checkIfFollowApi, followApi, unfollowApi } from "../../../domains/follow/follow";
import { useNavigate } from "react-router-dom";
import { addNotificationFollow, patchNotificationFollow } from "../../../domains/follow/notificationFollow";

function UserProfile({ userId }) {
  const token = useSelector((state) => state.auth.token);
  const userIdSlice = useSelector((state) => state.auth.userId);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [isFollow, setIsFollow] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followedCount, setFollowedCount] = useState(0);

  useEffect(() => {
    const getNameUserApi = async () => {
      try {
        let response = await getName(userId, token);
        setEmail(response.email);
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          showToastError("Veuillez vous reconnecter s'il vous plaît.");
        }
      }
    };

    const countFollowers = async () => {
      try {
        const count = await counterFollower(token, userId);
        setFollowersCount(count);
      } catch (error) {
        console.error('Erreur lors du comptage des abonnés:', error);
      }
    };

    const countFollowed = async () => {
      try {
        const count = await counterFollowed(token, userId);
        setFollowedCount(count);
      } catch (error) {
        console.error('Erreur lors du comptage des abonnements:', error);
      }
    };

    if (token && userId) {
      getNameUserApi();
      countFollowers();
      countFollowed();
    }

    const checkIfFollow = async () => {
      try {
        const response = await checkIfFollowApi(token, userIdSlice, userId);
        setIsFollow(response);
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          showToastError("Veuillez vous reconnecter s'il vous plaît.");
        }
      }
    };

    if (userId !== userIdSlice) {
      checkIfFollow();
    }
  }, [token, userId, userIdSlice]);

  const follow = async () => {
    try {
      const response = await followApi(token, userIdSlice, userId);
      await addNotificationFollow(userIdSlice, userId);
      showToastSuccess(`Ami bien ajouté : ${email}`);
      setIsFollow(true);
    } catch (error) {
      console.error("Erreur lors de la demande de follow :", error);
    }
  }

  const unfollow = async () => {
    try {
      const response = await unfollowApi(token, userIdSlice, userId);
      await patchNotificationFollow(userIdSlice, userId);
      showToastSuccess(`Ami bien supprimé : ${email}`);
      setIsFollow(false);
    } catch (error) {
      console.error("Erreur lors de la demande de unfollow :", error);
    }
  }

  const handleFollowersClick = () => {
    if (userId === userIdSlice) {
      navigate(`/followers/${userId}`);
    }
  };

  const handleFollowingClick = () => {
    if (userId === userIdSlice) {
      navigate(`/following/${userId}`);
    }
  };

  return (
    <Fragment>
      <div className="container mx-auto w-full px-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-white text-xl font-bold">PROFIL</h1>
        </div>

        <div className="mb-4 w-full bg-black text-white border border-gray-800 rounded-lg">
          <div className="w-full h-32 bg-gray-700"></div>

          <div className="px-4 -mt-12 flex justify-center md:justify-start">
            <div className="w-24 h-24 bg-gray-600 rounded-full border-4 border-black"></div>
          </div>

          <div className="px-4 py-2">
            <div className="flex">
              <h2 className="text-xl font-bold mr-3">{email}</h2>
              {
                userIdSlice === userId ? (
                  ""
                ) : isFollow ? (
                  <Button variant="outlined" onClick={unfollow}>Désabonner</Button>
                ) : (
                  <Button variant="outlined" onClick={follow}>Suivre</Button>
                )
              }
            </div>

            <div className="mt-2 flex justify-center md:justify-start space-x-4 text-sm text-gray-400">
              <button
                onClick={handleFollowingClick}
                className={`hover:underline ${userId === userIdSlice ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <span><strong className="text-white">{followersCount}</strong> abonnements</span>
              </button>
              <button
                onClick={handleFollowersClick}
                className={`hover:underline ${userId === userIdSlice ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <span><strong className="text-white">{followedCount}</strong> abonnés</span>
              </button>
            </div>
          </div>

          <div className="flex justify-between border-t border-gray-800 text-gray-400 text-sm">
            {["Posts", "Réponses", "J'aime"].map((item) => (
              <button key={item} className="flex-1 py-2 hover:text-white">
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UserProfile;
