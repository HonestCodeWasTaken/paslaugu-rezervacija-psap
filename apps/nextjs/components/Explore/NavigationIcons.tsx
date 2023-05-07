// NavigationIcons.tsx
type Props = {};

const NavigationIcons = (props: Props) => {
  return (
    <div className="flex items-center justify-between pt-2">
      <a href="#" className="mr-3">
        <svg
          className="h-6 w-6 fill-current text-gray-500 hover:text-black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.974 8.5c.35-.41.73-1.07.919-2.018 2.047-.2 3.961-1.147 5.161-2.235 1.19 1.088 3.104 2.035 5.161 2.235.17.948.536 1.608.885 2.018 1.38 1.62 2.463 4.028 2.463 6.529 0 2.56-1.654 4.6-3.81 4.6-3.392 0-4.948-4.982-4.948-7.332S6.366 7.667 2.974 7.667c-2.156 0-3.81 2.04-3.81 4.6 0 2.5 1.083 4.909 2.463 6.529z" />
        </svg>
      </a>
      <a href="#">
        <svg
          className="h-6 w-6 fill-current text-gray-500 hover:text-black"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M15.973 13.61L11.92 9.556a2.97 2.97 0 00-.353-.354L13.62 7.14a.993.993 0 00-1.4-1.4l-1.958 1.957-.424-.426a1 1 0 00-1.414 0L7.45 8.1c-.256.256-.371.619-.299.964L6.02 14.14l5.175-1.132c.348.072.71-.043.966-.3l1.25-1.25 1.485 1.485a1.003 1.003 0 001.414 0l1.415-1.415a.995.995 0 000-1.41l-1.487-1.488zm-6.933 1.838l-3.553.777.776-3.55 4.286-4.287 2.778 2.777-4.287 4.283z" />
        </svg>
      </a>
    </div>
  );
};

export default NavigationIcons;
