import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { LucideInfo } from "lucide-react";

const InstructionInfo: React.FC = () => {
	return (
		<Popover.Root>
			<Popover.Trigger asChild>
				<button className="icon-button" aria-label="Instructions Info" type="button">
					<LucideInfo size={18} />
				</button>
			</Popover.Trigger>
			<Popover.Portal>
				<Popover.Content className="popover-content" >
					<div>
						<strong>How to write instructions:</strong>
						<ol>
							<li>Write one step per line.</li>
							<li>For optional steps, add <code>(optional)</code> at the end.</li>
						</ol>
						<p>
							Example:
							<br />
							<code>1. Add chili flakes (optional)</code>
						</p>
					</div>
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
};

export default InstructionInfo;
