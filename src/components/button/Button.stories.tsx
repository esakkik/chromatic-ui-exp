import React from "react";

import { action } from "@storybook/addon-actions";
import { Button } from "./Button";

export default {
  title: "Button",
  component: Button,
};

export const Text = (): React.ReactElement => (
  <Button onClick={action("clicked")}>
    Primary Button
  </Button>
);

export const Emoji = (): React.ReactElement => (
  <Button onClick={action("clicked")}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);

Emoji.story = {
  name: "with emoji",
};
