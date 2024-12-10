import { arrow_icon, tradeCycle } from '@/assets';
import { CustomIcon } from '@/components';
import { Link, useNavigate, useRouteError } from 'react-router-dom';

function errorPage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const error = useRouteError();
  return (
    <div className="flex relative justify-center items-center h-screen bg-[#E4F0FA]">
      <div className="flex flex-col w-full items-center">
        <div className="absolute top-6 mx-auto">
          <Link to={'/'} className="mx-auto mt-6">
            <CustomIcon
              icon={tradeCycle}
              title="tradeCycle"
              className="text-center"
            />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center text-center w-full">
          <div className="flex-col items-center">
            <h1 className="font-bold text-3xl">Whoops! Error Occured</h1>
            <div className="py-6"></div>
            <span className="italic text-[17px]">{error?.message}</span>
          </div>
        </div>
        <div className="absolute left-12 xxs:left-4 xs:left-4 top-6">
          <img
            src={arrow_icon}
            className="h-6 w-6 cursor-pointer"
            alt="back arrow"
            onClick={() => navigate(-1)}
          />
        </div>
      </div>
    </div>
  );
}

export default errorPage;
