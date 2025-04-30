import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  useDisclosure,
  Switch,
  Slider,
} from "@heroui/react";
import { useEffect } from "react";
import { useGenerationList } from "../hooks/useFetch";
import useSettings from "../hooks/useSettings";

export const SettingsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    style={{ imageRendering: "pixelated" }}
    {...props}
  >
    {/* Great Ball (超级球) icon */}
    <g>
      {/* Outer circle */}
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="1.5"
      />

      {/* Blue top half */}
      <path
        d="M12,2 a10,10 0 0,1 10,10 h-20 a10,10 0 0,1 10,-10 z"
        fill="#3B88C3"
      />

      {/* Center band */}
      <rect x="2" y="11" width="20" height="2" fill="#000000" />

      {/* Center button */}
      <circle
        cx="12"
        cy="12"
        r="2.5"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="1" fill="#CCCCCC" />
    </g>
  </svg>
);

export const SettingModal = () => {
  const { settings, setSettingKey } = useSettings();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: generationList, mutate } = useGenerationList();

  if (generationList && settings.checkedValues.length === 0) {
    setSettingKey(
      "checkedValues",
      generationList.map((item) => item.identifier)
    );
  }

  // open modal lifecycle
  useEffect(() => {
    if (isOpen) {
      mutate();
    }
  }, [mutate, isOpen]);

  return (
    <>
      <Button
        size="sm"
        isIconOnly
        aria-label="settings"
        radius="full"
        onPress={onOpen}
        className="pokeball-button flex items-center justify-center"
      >
        <SettingsIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          base: "pokemon-modal",
          header: "pokemon-font text-base",
          body: "pokemon-font text-xs",
          footer: "gap-2",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pixel-border-bottom">
                游戏设置
              </ModalHeader>
              <ModalBody>
                <RadioGroup
                  isDisabled
                  orientation="horizontal"
                  className="pokemon-font text-xs"
                >
                  {["easy", "normal", "hard"].map((item, index) => (
                    <Radio
                      value={item}
                      key={index}
                      className="pokemon-font text-xs"
                    >
                      {item}
                    </Radio>
                  ))}
                </RadioGroup>
                <div className="w-full pixel-divider my-2" />
                <CheckboxGroup
                  orientation="horizontal"
                  value={settings.checkedValues}
                  className="pokemon-font text-xs"
                  onValueChange={(newValues) => {
                    if (newValues.length > 0) {
                      setSettingKey("checkedValues", newValues);
                    }
                  }}
                >
                  {generationList
                    ? generationList.map((item) => (
                        <Checkbox
                          key={item.id}
                          value={item.identifier}
                          className="capitalize pokemon-font text-xs"
                          onChange={() => {
                            const newValue =
                              settings.encodeGeneration ^ (1 << (item.id - 1));
                            if (newValue !== 0) {
                              setSettingKey("encodeGeneration", newValue);
                            }
                          }}
                        >
                          {item.name}
                        </Checkbox>
                      ))
                    : []}
                </CheckboxGroup>
                <div className="w-full pixel-divider my-2" />
                <p className="font-bold pokemon-font text-sm">显示信息</p>
                <div className="flex flex-col gap-2">
                  <Switch
                    size="sm"
                    isSelected={settings.stats}
                    className="pokemon-font text-xs"
                    onValueChange={(val) => {
                      setSettingKey("stats", val);
                    }}
                  >
                    更多种族值信息
                  </Switch>
                  <Switch
                    size="sm"
                    isSelected={settings.shape}
                    className="pokemon-font text-xs"
                    onValueChange={(val) => {
                      setSettingKey("shape", val);
                    }}
                  >
                    更多外形信息
                  </Switch>
                  <Switch
                    size="sm"
                    isSelected={settings.breeding}
                    className="pokemon-font text-xs"
                    onValueChange={(val) => {
                      setSettingKey("breeding", val);
                    }}
                  >
                    培育(蛋组/捕获率)
                  </Switch>
                </div>
                <div className="w-full pixel-divider my-2" />
                <p className="font-bold pokemon-font text-sm">
                  猜测次数: {settings.chance}
                </p>
                <Slider
                  value={settings.chance}
                  aria-label="Chance"
                  className="pokemon-font"
                  onChange={(val) => {
                    // value must be number
                    setSettingKey("chance", val as number);
                  }}
                  minValue={1}
                  maxValue={25}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="w-24 h-10 pixel-button pixel-button-danger pixel-corners pokemon-font"
                >
                  关闭
                </Button>
                <Button
                  color="primary"
                  onPress={onClose}
                  className="w-24 h-10 pixel-button pixel-button-primary pixel-corners pokemon-font"
                >
                  保存
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
