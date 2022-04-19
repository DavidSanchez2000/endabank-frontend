import ApproveUserProps from "@components/ApproveUserTable/approveUserTable.interface";
import apiUrls from "../../constants/apiUrls";
import { useEffect, useState } from "react";
import { getAxios } from "../../utils/axios";
import {
  PopUpMessage,
  ApproveUserTable,
  Spinner,
} from "../../components/index";
import strings from "../../constants/strings";
import { AxiosError } from "axios";
import { Navigate } from "react-router-dom";

const ActivateAccountForm = () => {
  const [list, setList] = useState<Array<ApproveUserProps>>([]);
  const [approved, setApproved] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [colorPopUpMessage, setColorPopUpMessage] = useState(false);
  const [showPopUpMessage, setShowPopUpMessage] = useState(false);
  const [messagePopUp, setMessagePopUp] = useState<string>(
    strings.USER_REGISTERED
  );
  const token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbnRob255LmdhbGxlZ29AZW5kYXZhLmNvbSIsImV4cCI6MTY1MDQwMTc2NiwiaWF0IjoxNjUwNDAwNTY2LCJ1c2VySWQiOjV9.KwX4FsGQZO3FMEwP5m3HgIcX_JTk3HhEoUAnAaZ4yy_r_GJgYmaLOOXAY1n5toCtGPHZ9T0sits8Y76EFMNvRA";
  useEffect(() => {
    async function getData() {
      setApproved(true);
      try {
        setIsLoading(true);
        const response: Array<ApproveUserProps> = await getAxios(
          apiUrls.GET_USERS_TO_APPROVE_URL,
          token
        );
        setIsLoading(false);
        setList(response);
      } catch (err) {
        const error = err as AxiosError;
        let message = strings.ERROR_MESSAGE;
        if (error.response?.data?.statusCode != 500) {
          message = error.response?.data?.message || strings.ERROR_MESSAGE;
        }
        setShowPopUpMessage(true);
        setColorPopUpMessage(false);
        setMessagePopUp(message);
        setShowPopUpMessage(true);
        setIsLoading(false);
        setApproved(false);
      }
    }
    getData();
  }, []);
  const renderPageOrLoading = () => {
    return isLoading ? (
      <Spinner />
    ) : (
      <div>
        {approved ? (
          <div className="flex w-full justify-center mt-20 ">
            <div className="p-4  container-form  item-center  bg-white rounded-lg border shadow-md sm:p-8">
              <header className="p-4 bg-white rounded-lg shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
                <span className="text-xl">User Approval</span>
              </header>

              <div className="flex w-full justify-center mt-10">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        First Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Last Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Approved
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((value, key) => (
                      <ApproveUserTable
                        firstName={value.firstName}
                        lastName={value.lastName}
                        email={value.email}
                        id={value.id}
                        approved={value.approved}
                        key={value.id}
                        token={token}
                      ></ApproveUserTable>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Navigate replace to="/" />
          </div>
        )}
      </div>
    );
  };
  return (
    <>
      {token.length != 0 ? renderPageOrLoading() : <Navigate replace to="/" />}
      {showPopUpMessage && (
        <div className="fixed bottom-0 right-0 lg:w-1/4 md:w-1/3  ">
          <PopUpMessage
            message={messagePopUp}
            setShowPopUpMessage={setShowPopUpMessage}
            isColorError={colorPopUpMessage}
          />
        </div>
      )}
    </>
  );
};

export default ActivateAccountForm;
