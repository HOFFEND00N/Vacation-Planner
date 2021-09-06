import React from "react";
import Button from "@confirmit/react-button";

export function Welcome() {
  return <Button appearance={Button.appearances.primaryNeutral}>
    {Button.appearances.secondaryBanner}
  </Button>;
}
