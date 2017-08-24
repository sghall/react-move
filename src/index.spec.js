// @flow weak
/* eslint-env mocha */

/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */

import { assert } from 'chai';
import * as ReactMove from './index';

describe('React-Move', () => it('should have exports', () => assert.ok(ReactMove)));
