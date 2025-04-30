import { PokemonType } from "./Type";
import { DistanceIcon } from "./Icon";
import { useTranslation } from "react-i18next";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Chip,
} from "@heroui/react";

export const PokemonSummary = (props: PokemonItemProps) => {
  const { item } = props;
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="flex">
      <div className="flex flex-col w-20 flex-1">
        <PokemonType item={item} />
        <div className="col-span-1">GEN {item.gen.key}</div>
      </div>

      <div className="flex flex-col flex-1 space-y-2">
        <Chip
          variant="flat"
          color={item.stat.pow.value === "equiv" ? "success" : "default"}
          className="pixel-border pokemon-font text-xs min-w-full"
        >
          <div className="flex items-center">
            <p className="dark:text-white chip-content flex-grow text-center w-full">
              {item.stat.pow.key}
            </p>
            <DistanceIcon {...item.stat.pow} />
          </div>
        </Chip>

        <div>
          <Button
            onPress={onOpen}
            className="col-span-2 h-6 justify-center items-center pixel-button pixel-corners pokemon-font"
          >
            {t("detail")}
          </Button>
          <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
            <DrawerContent>
              {(onClose) => (
                <>
                  <DrawerHeader className="flex flex-col gap-1">
                    Drawer Title
                  </DrawerHeader>
                  <DrawerBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Nullam pulvinar risus non risus hendrerit venenatis.
                      Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor
                      cupidatat consequat elit dolor adipisicing. Mollit dolor
                      eiusmod sunt ex incididunt cillum quis. Velit duis sit
                      officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse
                      laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
                      deserunt nostrud ad veniam.
                    </p>
                  </DrawerBody>
                  <DrawerFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                      Action
                    </Button>
                  </DrawerFooter>
                </>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};
