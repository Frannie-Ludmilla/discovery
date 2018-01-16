/* eslint "react/prop-types": "warn" */
/*eslint-disable react/no-danger */
import React, { Component } from "react";
import PropTypes from "prop-types";

import Icon from "metabase/components/Icon.jsx";
import LoadingSpinner from "metabase/components/LoadingSpinner.jsx";

import cx from "classnames";

export default class PulseCardPreview extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        card: PropTypes.object.isRequired,
        cardPreview: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
        fetchPulseCardPreview: PropTypes.func.isRequired,
        attachmentsEnabled: PropTypes.bool,
    };

    componentWillMount() {
        this.props.fetchPulseCardPreview(this.props.card.id);
    }

    componentWillReceiveProps(nextProps) {
        // if we couldn't detect a card type, set include_csv = true
        if (nextProps.cardPreview && nextProps.cardPreview.pulse_card_type == null &&
            !nextProps.card.include_csv && !nextProps.card.include_xls)
        {
            nextProps.onChange({ ...nextProps.card, include_csv: true })
        }
    }

    hasAttachment() {
        const { card } = this.props;
        return card.include_csv || card.include_xls;
    }

    toggleAttachment = () => {
        const { card, onChange } = this.props;
        if (this.hasAttachment()) {
            onChange({ ...card, include_csv: false, include_xls: false })
        } else {
            onChange({ ...card, include_csv: true })
        }
    }

    render() {
        let { cardPreview, attachmentsEnabled } = this.props;
        const isAttachment = attachmentsEnabled && cardPreview && cardPreview.pulse_card_type == null && this.hasAttachment()
        return (
            <div className="flex relative flex-full">
                <div className="absolute top right p2 text-grey-2">
                    { attachmentsEnabled && !isAttachment &&
                        <Icon
                            name="attachment" size={18}
                            className={cx("cursor-pointer py1 pr1 text-brand-hover", { "text-brand": this.hasAttachment() })}
                            onClick={this.toggleAttachment}
                        />
                    }
                    <Icon
                        name="close" size={18}
                        className="cursor-pointer py1 pr1 text-brand-hover"
                        onClick={this.props.onRemove}
                    />
                </div>
                <div
                    className="bordered rounded flex-full scroll-x"
                    style={{ display: !cardPreview && "none" }}
                >
                    {/* Override backend rendering if we're including this as an attachment */}
                    { isAttachment ?
                      <RenderedPulseCardPreview href={cardPreview.pulse_card_url}>
                        <RenderedPulseCardPreviewHeader>
                          {cardPreview.pulse_card_name}
                        </RenderedPulseCardPreviewHeader>
                        <RenderedPulseCardPreviewMessage>
                          This question will be added as a file attachment
                        </RenderedPulseCardPreviewMessage>
                      </RenderedPulseCardPreview>
                    :
                        <div dangerouslySetInnerHTML={{__html: cardPreview && cardPreview.pulse_card_html}} />
                    }
                </div>
                { !cardPreview &&
                    <div className="flex-full flex align-center layout-centered pt1">
                        <LoadingSpinner className="inline-block" />
                    </div>
                }
            </div>
        );
    }
}

// copied from metabase/pulse/render.clj
const RenderedPulseCardPreview = ({ href, children }) =>
  <a
    href={href}
    style={{
      fontFamily: 'Lato, "Helvetica Neue", Helvetica, Arial, sans-serif',
      margin: 16,
      marginBottom: 16,
      display: "block",
      textDecoration: "none"
    }}
    target="_blank"
  >
    {children}
  </a>

RenderedPulseCardPreview.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node
}

// copied from metabase/pulse/render.clj
const RenderedPulseCardPreviewHeader = ({ children }) =>
    <table style={{ marginBottom: 8, width: "100%" }}>
      <tbody>
        <tr>
          <td>
            <span style={{
              fontFamily: 'Lato, "Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: 16,
              fontWeight: 700,
              color: "rgb(57,67,64)",
              textDecoration: "none"
            }}>
              {children}
            </span>
          </td>
          <td style={{ textAlign: "right" }}></td>
        </tr>
      </tbody>
    </table>

RenderedPulseCardPreviewHeader.propTypes = {
  children: PropTypes.node
}

const RenderedPulseCardPreviewMessage = ({ children }) =>
  <div className="text-grey-4">
    {children}
  </div>

RenderedPulseCardPreviewMessage.propTypes = {
  children: PropTypes.node
}
