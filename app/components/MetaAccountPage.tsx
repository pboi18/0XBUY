"use client";

import {
  Abstraxion,
  useAbstraxionAccount,
  useModal,
} from "@burnt-labs/abstraxion";
import { Button } from "@burnt-labs/ui";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type MetaAccountPageProps = {
  onClose?: () => void; // Optional for modal usage
  onLogin?: (address: string) => void; // Optional for parent callback
};

export default function MetaAccountPage({
  onClose,
  onLogin,
}: MetaAccountPageProps): JSX.Element {
  const router = useRouter();
  const {
    data: { bech32Address },
    isConnected,
  } = useAbstraxionAccount();
  const [, setShow] = useModal();

  // Handle login
  useEffect(() => {
    if (isConnected && bech32Address) {
      onLogin?.(bech32Address); // Pass the address to the parent if provided
    }
  }, [isConnected, bech32Address, onLogin]);

  // Handle logout
  const handleLogout = () => {
    // Clear session and redirect to homepage
    router.push("/");
  };

  return (
    <main className="m-auto flex min-h-screen max-w-xs flex-col items-center justify-center gap-4 p-4">
      {/* <h1 className="text-2xl font-bold tracking-tighter text-black dark:text-white">
        Abstraxion Meta Accounts
      </h1> */}
      {bech32Address ? (
        <div className="border-2 border-primary rounded-md p-4 flex flex-col gap-4 items-center">
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium">Connected Address:</div>
            <div className="text-sm font-mono">
              {bech32Address.substring(0, 6)}...{bech32Address.slice(-4)}
            </div>
          </div>
          <Button
            fullWidth
            className="bg-red-500 text-white hover:bg-red-600"
            onClick={handleLogout}
          >
            Log Out
          </Button>
        </div>
      ) : (
        <Button
          fullWidth
          onClick={() => {
            setShow(true);
          }}
          structure="base"
        >
          SIGN IN
        </Button>
      )}
      <Abstraxion onClose={onClose || (() => {})} />
    </main>
  );
}
