import Image from "next/image";

import { RouterOutputs } from "~/utils/api";

type Props = {
  reservations: RouterOutputs["reservations"]["getReservationsByUserSession"];
};

function ReservationsList({ reservations }: Props) {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Your Reservations
            </h3>
            {reservations && reservations.length > 0 ? (
              reservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="mt-5 border-t border-gray-200 pt-4"
                >
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="relative h-10 w-10">
                        <Image
                          className="h-10 w-10 rounded-full"
                          src={
                            reservation.User.image || "/default-user-image.jpg"
                          }
                          alt=""
                        />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {reservation.Service.service_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {reservation.description}
                      </div>
                      <div className="mt-2 flex">
                        <div className="text-sm text-gray-900">
                          <p>
                            {new Date(reservation.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="mt-5 text-center text-gray-500">
                You don't have any reservations yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationsList;
