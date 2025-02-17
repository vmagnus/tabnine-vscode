import * as assert from "assert";
import { afterEach } from "mocha";
import * as sinon from "sinon";
import { onPluginInstalledEmitter } from "../../events/onPluginInstalledEmitter";
import { getContext } from "./utils/preReleaseInstaller.utils";
import handlePluginInstalled from "../../handlePluginInstalled";
import { ALREADY_OPENED_GETTING_STARTED_KEY } from "../../state/gettingStartedOpenedState";
import * as gettingStartedWebview from "../../webview/openGettingStartedWebview";

suite("Getting started tests", () => {
  afterEach(() => {
    sinon.verifyAndRestore();
  });

  test("Should open the webview if the user hasn't seen it yet", () => {
    const openGettingStartedWebviewStub = sinon.spy(
      gettingStartedWebview,
      "openGettingStartedWebview"
    );
    const handler = handlePluginInstalled(getContext({}));
    onPluginInstalledEmitter.fire();
    handler.dispose();

    assert(openGettingStartedWebviewStub.calledOnce);
  });

  test("Should not open the webview if the user has already seen it", () => {
    const openGettingStartedWebviewStub = sinon.spy(
      gettingStartedWebview,
      "openGettingStartedWebview"
    );
    const handler = handlePluginInstalled(
      getContext({
        [ALREADY_OPENED_GETTING_STARTED_KEY]: true,
      })
    );
    onPluginInstalledEmitter.fire();
    handler.dispose();

    assert(openGettingStartedWebviewStub.notCalled);
  });
});
