const useGetUserDetails = () => {
  const user_name = window.localStorage.getItem("user_name");
  const userId = window.localStorage.getItem("userId");

  return [user_name, userId];
};

export default useGetUserDetails;
